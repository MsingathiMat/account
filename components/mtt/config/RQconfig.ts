

export const QueryModels = {
  Companies: {
    QueryKey: "Company",
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
  Companies: {
    MutationKey: "mtCompany",
    Dependants:[QueryModels.Companies.QueryKey],
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



