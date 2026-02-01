import '/models/placed_bet.dart';

enum Status { open, resolved, locked }

class Bet {
  final String title;
  final int totalPot;
  final int poolFor;
  final int poolAgainst;
  final Status status;
  final String createdBy;
  final DateTime createdAt;
  final DateTime endsAt;
  final PlacedBet? myBet;

  Bet({
    required this.title,
    required this.totalPot,
    required this.poolFor,
    required this.poolAgainst,
    required this.status,
    required this.createdBy,
    required this.createdAt,
    required this.endsAt,
    this.myBet,
  });

  factory Bet.fromJSON(Map<String, dynamic> json) {

    Status status = Status.locked;
    switch(json['status']) {
      case 'open' :
      status = Status.open;
      case 'resolved' :
      status = Status.resolved;
      case 'locked' :
      status = Status.locked;
    }

    return Bet(
      status: status,
      title: json['title'],
      totalPot: json['total_pot'],
      poolFor: json['pool_for'],
      poolAgainst: json['pool_against'],
      createdAt: DateTime.parse(json['created_at']),
      createdBy: json['created_by'],
      endsAt: DateTime.parse(json['ends_at']),
      myBet: json["my_bet"] != null ? PlacedBet.fromJSON(json['my_bet']) : null,
    );
  }
}
