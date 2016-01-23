# napstr
napstr is an app for the nap enthusiast. Users can search for fellow DTN users in their area to share in some naptime activities. Users can set nap preferences, time slots, and availability. It's not creepy. Its napstr. 


## napstr User Stories
**Current**
- A user should be able to search for a potential napping partner.
- A user will need to denote whether they are available to host a nap or are looking for an invite.
- A user should be able to set nap preferences: big spoon, little spoon, side-by-side, top-bunk, etc.
- A user should be able to set environmental-preferences: length of time, background noise, lighting, attire, hammock, etc.
- Users should be able to message each other.
- Users should be able to send and confirm/deny requests.

**Sprint**
- A user should be able to turn availability on or off.
- When a user turns availability on, they should see other DTN users in close proximity to a particular location.
- A user should be able to set up a nap schedule during which they are available so other users can leave requests.
- A user should be able to set up a profile where they are publicly reviewed by fellow napstrs.

**Backlog**
- A user should be notified when they have been requested, messaged, or reviewed.
- A user can rent their bed for a nap-length period of time to third-party napstrs. 
- Nap roulette.
- Create API.
- Cash in.


##Wire Frames 
https://gomockingbird.com/projects/pqqwxfz

##ERD
```
MongoDB: napstr
Collection: napstrs
Document: 
  [{name: 'string',
  username: 'string',
  email: 'string',
  password_digest: 'string',
  profilePic: 'string',
  aboutMe: 'string',
  address: 'string',
  availability: boolean,
  rating: integer (out of 3),
  location: [lat (integer), lng (integer)],
  napPreferences: ['string', 'string'],
  envPreferences: ['string', 'string'],
  reviews: [{user: 'string',
            content: 'string'}],
  requests: [{name: 'string', 
            pending: boolean, 
            confirmed: boolean, 
            denied: boolean, 
            date: 'string'}]
  ]
```

##Technologies Used
- MongoDB
- Express
- AngularJS
- Node.js
- Google Maps API
