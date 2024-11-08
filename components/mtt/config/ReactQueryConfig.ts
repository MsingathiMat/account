

export const QueryModels = {
  Companies: {
    QueryKey: "Company",
  },
  Items: {
    QueryKey: "Items",
  },
  Clients: {
    QueryKey: "Clients",
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
  Items: {
    MutationKey: "mtItems",
    Dependants: QueryModels.Items.QueryKey,
  },
  Clients: {
    MutationKey: "mtClients",
    Dependants: QueryModels.Clients.QueryKey,
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



