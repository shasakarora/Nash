import 'package:app/widgets/normal_text_field.dart';
import 'package:flutter/material.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsetsGeometry.all(16.0),
        child: Column(
          children: [
            SizedBox(height: 12.0),
            CustomTextField(hintText: 'Search')
          ],
        ),
      ),
    );
  }
}
