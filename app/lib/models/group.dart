import '/models/member.dart';

class Group {
  final String groupID;
  final String name;
  final String description;
  final String createdBy;
  final DateTime createdAt;
  final List<GroupMember> memberList;

  Group({
    required this.groupID,
    required this.name,
    required this.description,
    required this.createdAt,
    required this.createdBy,
    required this.memberList,
  });

  factory Group.fromJSON(Map<String, dynamic> json) { 
    return Group(
      groupID: json['id'],
      name: json['title'],
      description: json['description'],
      createdAt: DateTime.parse(json['created_at']),
      createdBy: json['created_by'],
      memberList: List.generate(json['members'].length, (index) =>
        GroupMember.fromJSON(json['members'][index])
      )
    );
  }
}
