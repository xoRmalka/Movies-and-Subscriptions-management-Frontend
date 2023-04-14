const appReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      // Find the index of the user to be updated

      const updatedIndex = state.users.findIndex(
        (user) => user._id === action.payload._id
      );

      // Create a new users array with the updated user object
      const updatedUsers = [
        ...state.users.slice(0, updatedIndex),
        action.payload,
        ...state.users.slice(updatedIndex + 1),
      ];
      return { ...state, users: updatedUsers };
    case "DELETE_USER":
      // Filter out the user to be deleted
      const filteredUsers = state.users.filter(
        (user) => user._id !== action.payload
      );

      return { ...state, users: filteredUsers };
    case "ADD_USER":
      // Create a new users array with the added user object
      const addedUsers = [...state.users, action.payload];
      return { ...state, users: addedUsers };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE":
      // Create a new movies array with the added movie object
      const addedMovies = [...state.movies, action.payload];
      console.log(action.payload)
      return { ...state, movies: addedMovies };

    default:
      return state;
  }
};

export default appReducer;
