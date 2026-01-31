extension NumberExtension on num {
  String formatWithCommas() {
    final parts = toStringAsFixed(2).split('.');

    final reg = RegExp(r'\B(?=(\d{3})+(?!\d))');

    parts[0] = parts[0].replaceAll(reg, ',');
    return parts.join('.');
  }
}
