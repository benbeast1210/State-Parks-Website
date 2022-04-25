// squareKmTotal returns the total square kilometers of all specified parks as an integer
const squareKmTotal = (parks) => {
// creating array of areaInSquareKm values for .reduce() to parse
  let allAreas = parks.map((parks) => parks.areaInSquareKm);
  let totalArea = allAreas.reduce((total, allAreas) => total += allAreas);
  return totalArea;
}

/* 
  parkNameAndState takes in the array of park objects as a parameter and returns an array of reduced objects like so... 
  [{ name: Arcadia, state: Maine },
    ... ,]
*/
function parkNameAndState(parks) {
  return parks.reduce((total, park) => {
    total[park.name] = park.location.state;
    return total;
  }, {});
}

/* 
  
  parkByState will return an object where each key is the state name and each value is an array of each park object associated 
  with that state. 

  Example Output for function call : 
  {
    Maine: 
    [{ 
      name: "Acadia", 
      areaInSquareKm: 198.6, 
      location: { state: "Maine" } },
      ...,
    ],
    ...
  }

*/
function parkByState(parks) {
// Implementing .reduce() here will allow for the customized output, while also providing the versatility of a higher-order funciton.  
  return parks.reduce((total, park) => {
    const stateKey = park.location.state;
// If state exists as a key, push park
    if (total[stateKey]) { 
      total[stateKey].push(park);
    } else {
// If 'state' does not exist as a key, create key/value pair
      total[stateKey] = [park]; 
    }
    return total; 
// The primary difference between this and 'getParksByState' is the output type & format.
  }, {});
}

/*
   Simplified version of parkByState; getParksByState simply returns an array with the park object(s), unmutated.

   Example Output for function call, getParksByState(parks, 'Maine'):
   [
     { 
      name: "Acadia", 
      areaInSquareKm: 198.6, 
      location: { state: "Maine" } 
     },
    ...
   ];

*/
function getParksByState(parks, stateInput) {
// I'll first create an array object to pass the test parameter of returning undefined for fail result
  let result = [];
// The for loop will bring the correct parks to 'result'
  for (let index in parks) {
    if (parks[index].location.state === stateInput) {
      result.push(parks[index]);
    }
  }
  return result;
}

/*

  This takes the parks array, a users array of objs, and a user obj. It will isolate and define an 'activeUser', 
  take their 'wishlist' array property and cross-reference it with the given parks array, and return an array of 
  park objects, matching the park.id's in the activeUser's 'wishlist'.

  Example Output given the function call getWishlistParksForUser(parks, users, "karah.branch3"):
  [
    {
      id: 4,
      name: "Lake Clark",
      areaInSquareKm: 10602,
      location: { state: "Alaska" },
    },
    {
      id: 6,
      name: "Zion",
      areaInSquareKm: 595.9,
      location: { state: "Utah" },
    },
  ];
*/
function getWishlistParksForUser(parks, users, userInput) {
  // I'll need to isolate the activeUser
  let activeUser = users[userInput];
  activeUser.wishlist.sort();
  activeUser.visited.sort();
  // The for loop will add each of the parks on the wishlist, to the result
  let result = [];
  for (let index in parks) {
    if (activeUser.wishlist.includes(parks[index].id)) {
      result.push(parks[index]);
    }
  }
  return result;
}

/* 
 
This will take in the parks array, a users array of objs, a stateInput string, and a userInput obj. 

*/
function userHasVisitedAllParksInState(parks, users, stateInput, userInput) {
  //   First, I will extract the stateInput parks into an array
  let stateInputParks = []
  for (let index in parks) {
    if (parks[index].location.state === stateInput) {
      stateInputParks.push(parks[index].id);
    }
  }
// I need to isolate the current user's visited parks
  let activeUserVis = users[userInput].visited;
  activeUserVis.sort();
  stateInputParks.sort();
//   Now, I need a way to compare the arrays and return a boolean at the same time
  let result = activeUserVis.some((park, index) => {
    return stateInputParks[index] === activeUserVis[index];
  });
  return result;
}

/*
  This function returns a boolean based on whether or not 2 users have visited at least one park on the other's wish list. 
  The first user input is their visited parks. The second user inputs is their wishlist parks. They are then compared using
  .some() and a boolean is returned.
*/ 
function userHasVisitedParkOnWishlist(users, user1, user2) {
// I will isolate user1 and user2's "visited" array
  let userOneVis = users[user1].visited;
  let userTwoWish = users[user2].wishlist;
  userOneVis.sort();
  userTwoWish.sort();
// Now I will use .some() to compare the two arrays
  let result = userTwoWish.some((park, index) => {
    return userOneVis[index] === userTwoWish[index];
  });
  return result;
}

/*
  getUsersforUserWishlist(), takes the users array of objs, and a user obj as input. It will then recursively check the users 
  object for any user who has visited a park on the userInput's wishlist. If so, then that user obj. is pushed to the result 
  output array, and then returned at the end.

  Example Output: 
  [
    {},
    ...
  ];
*/  
function getUsersForUserWishlist(users, userInput) {
  let result = [];
  let userInputWish = users[userInput].wishlist.sort();
  for (let key in users) {
    if (userInputWish.some((id) =>
      users[key].visited.includes(id))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = {
  squareKmTotal, 
  parkNameAndState, 
  parkByState,
  getParksByState,
  getWishlistParksForUser,
  getUsersForUserWishlist,
  userHasVisitedAllParksInState,
  userHasVisitedParkOnWishlist,
};  