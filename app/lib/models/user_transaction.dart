class UserTransaction {
  final String betID;
  final String description;
  final int amount;
  final DateTime placedAt;

  UserTransaction({
    required this.betID, required this.description, required this.amount, required this.placedAt
  });

  factory UserTransaction.fromJSON(Map<String, dynamic> json) => UserTransaction(
    amount: json['amount'],
    description: json['desscription'],
    betID: json['bet_id'],
    placedAt: DateTime.parse(json['placed_at'])
  );
}