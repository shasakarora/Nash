import 'package:flutter/material.dart';

class SlidingShellStack extends StatefulWidget {
  final int index;
  final List<Widget> children;

  const SlidingShellStack({
    super.key,
    required this.index,
    required this.children,
  });

  @override
  State<SlidingShellStack> createState() => _SlidingShellStackState();
}

class _SlidingShellStackState extends State<SlidingShellStack> {
  late PageController _controller;

  @override
  void initState() {
    super.initState();
    _controller = PageController(initialPage: widget.index);
  }

  @override
  void didUpdateWidget(covariant SlidingShellStack oldWidget) {
    super.didUpdateWidget(oldWidget);
    if(widget.index != oldWidget.index) {
      _controller.animateToPage(
        widget.index,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOutCubic,
      );
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PageView(
      controller: _controller,
      physics: const NeverScrollableScrollPhysics(),
      children: widget.children,
    );
  }
}
