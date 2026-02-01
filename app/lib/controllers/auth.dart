import 'package:app/models/user.dart';
import 'package:app/providers/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '/providers/auth_state_provider.dart';
import '/providers/dio_provider.dart';
import '/services/storage_service.dart';

class AuthController extends Notifier<AuthStatus> {
  @override
  AuthStatus build() => AuthStatus.loading;

  Future<void> logout() async {
    await storage.deleteAll();
    ref.read(userProvider.notifier).state = null;
    state = AuthStatus.unauthenticated;
  }

  void setAuthenticated() {
    state = AuthStatus.authenticated;
  }

  Future<void> login({required String email, required String password}) async {
    final dio = ref.read(dioProvider);

    final res = await dio.post(
      '/auth/login',
      data: {'email': email, 'password': password},
    );

    await storage.write(
      key: StorageService.keyAccessToken,
      value: res.data['access_token'],
    );

    await storage.write(
      key: StorageService.keyRefreshToken,
      value: res.data['refresh_token'],
    );

    final userRes = await dio.get('/users/${res.data['id']}');

    ref.read(userProvider.notifier).state = User.fromJson(userRes.data);

    state = AuthStatus.authenticated;
  }
}

final authControllerProvider = NotifierProvider<AuthController, AuthStatus>(
  AuthController.new,
);
