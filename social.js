// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.users[(this.currentID += 1)] = {
      id: this.currentID,
      name: name,
    };
    this.currentID = this.currentID;
    this.follows[this.currentID] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    if (this.users[userID]) return this.users[userID];
    else return null;
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) {
      return false;
    } else {
      this.follows[userID1].add(userID2);
      return true;
    }
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    const followers = new Set();
    for (let id in this.follows) {
      if (this.follows[id].has(userID)) followers.add(parseInt(id));
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let recommenedPath = [];

    let visited = new Set();

    visited.add(userID);

    while (queue.length) {
      let currentPath = queue.shift();
      let currentNodeID = currentPath[currentPath.length - 1];

      if (currentPath.length > degrees + 2) break;

      if (currentPath.length > 2) recommenedPath.push(currentNodeID);

      for (let follow of this.follows[currentNodeID]) {
        if (!visited.has(follow)) {
          visited.add(follow);

          let newPath = [...currentPath, follow];
          queue.push(newPath);
        }
      }
    }
    return recommenedPath;
  }
}

module.exports = SocialNetwork;
