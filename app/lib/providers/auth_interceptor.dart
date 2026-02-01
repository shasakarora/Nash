import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '/controllers/auth.dart';
import '/providers/dio_provider.dart';
import '/services/storage_service.dart';

class AuthInterceptor extends Interceptor {
  AuthInterceptor(this.ref);
  final Ref ref;

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await storage.read(key: StorageService.keyAccessToken);
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.response?.statusCode == 401) {
      final refreshed = await _refreshToken();

      if (refreshed) {
        final dio = ref.read(dioProvider);
        final response = await dio.fetch(err.requestOptions);

        return handler.resolve(response);
      }

      await ref.read(authControllerProvider.notifier).logout();
    }

    handler.next(err);
  }

  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await storage.read(
        key: StorageService.keyRefreshToken,
      );

      if (refreshToken == null) return false;

      final dio = Dio();

      final res = await dio.post(
        '/auth/refresh',
        data: {'refresh_token': refreshToken},
      );

      await storage.write(
        key: StorageService.keyAccessToken,
        value: res.data['access_token'],
      );

      await storage.write(
        key: StorageService.keyRefreshToken,
        value: res.data['refresh_token'],
      );

      return true;
    } catch (_) {
      return false;
    }
  }
}

final authInterceptorProvider = Provider<AuthInterceptor>(
  (ref) => AuthInterceptor(ref),
);
