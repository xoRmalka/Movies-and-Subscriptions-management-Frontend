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
      return { ...state, movies: addedMovies };
    case "UPDATE_MOVIE":
      // Find the index of the movie to be updated
      const updatedMovieIndex = state.movies.findIndex(
        (movie) => movie._id === action.payload._id
      );
      // Create a new movies array with the updated movie object
      const updatedMovies = [
        ...state.movies.slice(0, updatedMovieIndex),
        action.payload,
        ...state.movies.slice(updatedMovieIndex + 1),
      ];
      return { ...state, movies: updatedMovies };
    case "DELETE_MOVIE":
      const filteredMovies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
      return { ...state, movies: filteredMovies };
    case "SET_MEMBERS":
      return { ...state, members: action.payload };
    case "UPDATE_MEMBER_MOVIES_WATCHED":
      const { memberId, subscription } = action.payload;

      // Find the index of the member to be updated
      const memberIndex = state.members.findIndex(
        (member) => member._id === memberId
      );

      // Create a copy of the member object and add the moviesWatched property
      const updatedMember = { ...state.members[memberIndex] };
      if (!updatedMember.moviesWatched) {
        updatedMember.moviesWatched = [];
      }

      // Add the movie to the member's moviesWatched array
      updatedMember.moviesWatched.push(subscription);

      // Create a new members array with the updated member object
      const updatedMembers = [
        ...state.members.slice(0, memberIndex),
        updatedMember,
        ...state.members.slice(memberIndex + 1),
      ];

      return { ...state, members: updatedMembers };
    case "DELETE_MEMBER":
      // Filter out the member to be deleted
      const filteredMembers = state.members.filter(
        (member) => member._id !== action.payload
      );
      return { ...state, members: filteredMembers };
    default:
      return state;
  }
};

export default appReducer;
