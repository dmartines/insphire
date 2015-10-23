ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
	    appId: '510246152469337',
	    secret: '29303c1a69bcfa747492766bf49cc4ea'
    }
  }
);