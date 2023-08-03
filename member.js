function skillsMember() {
    var skills = ["HTML", "CSS", "JS", "React", "Node"];
    var member = {
        name: "John",
        age: 25,
        skills: skills,
        address: {
            street: "123 Main St",
            city: "Miami",
            state: "FL"
        },
        getSkills: function() {
            return this.skills;
        }
    };
    return member;
}