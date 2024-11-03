

export const QueryModels = {
  User: {
    QueryKey: "User",
  },
  Artist: {
    QueryKey: "Artist",
  },
  Song: {
    QueryKey: "Song",
  },
  Events: {
    QueryKey: "Events",
  },
  EventsActiveEvent: {
    QueryKey: "EventsActiveIvent",
  },
};

export const MutationModels = {
  User: {
    MutationKey: "mtUser",
    Dependants: QueryModels.User.QueryKey,
  },
  Artist: {
    MutationKey: "mtArtist",
    Dependants: QueryModels.Artist.QueryKey,
  },
  Song: {
    MutationKey: "mtSong",
    Dependants: QueryModels.Song.QueryKey,
  },
  Event: {
    MutationKey: "Event",
    Dependants: [QueryModels.Events.QueryKey,QueryModels.EventsActiveEvent.QueryKey],
  },
  EventUpdateStatus: {
    MutationKey: "EventUpdateStatus",
    Dependants: QueryModels.Events.QueryKey,
  },
};



