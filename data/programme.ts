export type SessionType = "Plenary" | "Breakout" | "Workshop" | "Social";
export type Session = {
  time: string;
  title: string;
  type: SessionType;
  speaker?: string;
  organisation?: string;
  location: string;
};

export const programme = [
  {
    day: "Day 01",
    date: "9 November",
    sessions: [
      {
        time: "09:00 – 10:30",
        type: "Plenary",
        title: "Opening Plenary: Pathways to Impact",
        location: "Main Hall A",
      },
      {
        time: "10:45 – 12:15",
        type: "Breakout",
        title: "Thematic Dialogue: Climate Justice & Grantmaking",
        location: "Room 2",
      },
      {
        time: "12:30 – 14:00",
        type: "Social",
        title: "Networking Lunch",
        location: "Garden Terrace",
      },
      {
        time: "18:30 – 21:00",
        type: "Social",
        title: "Welcome Reception & Dinner",
        location: "La Maison Rousseau",
      },
    ] satisfies Session[],
  },
  {
    day: "Day 02",
    date: "10 November",
    sessions: [
      {
        time: "09:00 – 10:30",
        type: "Workshop",
        title: "Measuring Long-term Change",
        location: "Studio 1",
      },
      {
        time: "10:45 – 12:15",
        type: "Breakout",
        title: "Digital Rights in Authoritarian Contexts",
        location: "Room 3",
      },
      {
        time: "14:00 – 15:30",
        type: "Breakout",
        title: "Partner Spotlight: Rights Based Approaches",
        location: "Main Hall A",
      },
    ] satisfies Session[],
  },
  {
    day: "Day 03",
    date: "11 November",
    sessions: [
      {
        time: "09:30 – 11:00",
        type: "Plenary",
        title: "From Learning to Shared Action",
        location: "Main Hall A",
      },
      {
        time: "11:15 – 12:45",
        type: "Workshop",
        title: "Building the Conditions for Collaboration",
        location: "Studio 2",
      },
      {
        time: "14:00 – 15:30",
        type: "Plenary",
        title: "Closing Plenary & Next Steps",
        location: "Main Hall A",
      },
    ] satisfies Session[],
  },
];
