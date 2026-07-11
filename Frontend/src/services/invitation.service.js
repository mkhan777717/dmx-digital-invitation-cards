import api from "./api";

const INVITATIONS_KEY = "premier_invites_list";

const INITIAL_INVITATIONS = [
  {
    _id: "inv_wedding_1",
    templateId: "tpl_wedding_aurelia",
    eventDetails: {
      brideName: "Elena Sophia",
      groomName: "Julien Vance",
      date: "2026-09-24",
      time: "5:00 PM onwards",
      venue: "Villa Bellini, Lake Como, Italy",
      mapsUrl: "https://maps.google.com",
      quote: "Two hearts, one journey. Join us under the Italian sunset.",
      rsvpDeadline: "2026-08-15"
    },
    images: [],
    music: { name: "Aurelia Harp & Cello theme", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    status: "Published",
    paymentStatus: "Paid",
    deployedUrl: "/invitations/inv_wedding_1",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
  },
  {
    _id: "inv_birthday_2",
    templateId: "tpl_birthday_deco",
    eventDetails: {
      celebrantName: "Alexander",
      age: "30",
      date: "2026-07-28",
      time: "8:00 PM till late",
      venue: "The Onyx Lounge, New York, NY",
      dressCode: "Black Tie & Champagne Gold Accents",
      quote: "Life begins at thirty. Let's celebrate in style!"
    },
    images: [],
    music: null,
    status: "Draft",
    paymentStatus: "Pending",
    deployedUrl: "",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  }
];

function getStoredInvitations() {
  try {
    const listStr = localStorage.getItem(INVITATIONS_KEY);
    if (!listStr) {
      localStorage.setItem(INVITATIONS_KEY, JSON.stringify(INITIAL_INVITATIONS));
      return INITIAL_INVITATIONS;
    }
    return JSON.parse(listStr);
  } catch {
    return INITIAL_INVITATIONS;
  }
}

function setStoredInvitations(list) {
  localStorage.setItem(INVITATIONS_KEY, JSON.stringify(list));
}

export const invitationService = {
  async getInvitations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredInvitations());
      }, 400);
    });
  },

  async getInvitationById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = getStoredInvitations();
        const invite = list.find((i) => i._id === id);
        if (invite) {
          resolve(invite);
        } else {
          reject(new Error("Invitation not found"));
        }
      }, 200);
    });
  },

  async createInvitation(templateId, eventDetails, images, music) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getStoredInvitations();
        const newInvite = {
          _id: "inv_" + Math.random().toString(36).substr(2, 9),
          templateId,
          eventDetails,
          images: images || [],
          music: music || null,
          status: "Draft",
          paymentStatus: "Pending",
          deployedUrl: "",
          createdAt: new Date().toISOString()
        };
        list.unshift(newInvite);
        setStoredInvitations(list);
        resolve(newInvite);
      }, 500);
    });
  },

  async updateInvitation(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = getStoredInvitations();
        const idx = list.findIndex((i) => i._id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
          setStoredInvitations(list);
          resolve(list[idx]);
        } else {
          reject(new Error("Invitation not found"));
        }
      }, 300);
    });
  },

  async deleteInvitation(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = getStoredInvitations();
        const filtered = list.filter((i) => i._id !== id);
        if (filtered.length !== list.length) {
          setStoredInvitations(filtered);
          resolve({ success: true });
        } else {
          reject(new Error("Invitation not found"));
        }
      }, 300);
    });
  },

  async processPayment(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = getStoredInvitations();
        const idx = list.findIndex((i) => i._id === id);
        if (idx !== -1) {
          list[idx].paymentStatus = "Paid";
          list[idx].status = "Published";
          list[idx].deployedUrl = `/invitations/${id}`;
          setStoredInvitations(list);
          resolve(list[idx]);
        } else {
          reject(new Error("Invitation not found"));
        }
      }, 1000);
    });
  }
};
