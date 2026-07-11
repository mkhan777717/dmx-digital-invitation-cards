import tplWedding from "../assets/template-wedding.jpg";
import tplBirthday from "../assets/template-birthday.jpg";
import tplCorporate from "../assets/template-corporate.jpg";
import tplBaby from "../assets/template-baby.jpg";

const MOCK_TEMPLATES = [
  {
    _id: "tpl_wedding_aurelia",
    title: "Aurelia Noir",
    category: "Wedding",
    previewImage: tplWedding,
    price: "$29",
    templateCode: "wedding_aurelia",
    fields: [
      { name: "brideName", label: "Bride's Name", type: "text", required: true, placeholder: "e.g., Alma Sophia" },
      { name: "groomName", label: "Groom's Name", type: "text", required: true, placeholder: "e.g., Julien Vance" },
      { name: "date", label: "Event Date", type: "date", required: true },
      { name: "time", label: "Event Time", type: "text", required: true, placeholder: "e.g., 5:00 PM onwards" },
      { name: "venue", label: "Venue Name & Address", type: "text", required: true, placeholder: "e.g., Villa Bellini, Lake Como" },
      { name: "mapsUrl", label: "Google Maps Location URL", type: "text", required: false, placeholder: "e.g., https://maps.google.com/..." },
      { name: "quote", label: "Love Quote / Welcome Message", type: "textarea", required: false, placeholder: "e.g., Two hearts, one journey..." },
      { name: "rsvpDeadline", label: "RSVP Deadline Date", type: "date", required: false }
    ]
  },
  {
    _id: "tpl_birthday_deco",
    title: "Golden Deco",
    category: "Birthday",
    previewImage: tplBirthday,
    price: "$19",
    templateCode: "birthday_deco",
    fields: [
      { name: "celebrantName", label: "Celebrant Name", type: "text", required: true, placeholder: "e.g., Alexander" },
      { name: "age", label: "Age Being Celebrated", type: "number", required: true, placeholder: "e.g., 30" },
      { name: "date", label: "Party Date", type: "date", required: true },
      { name: "time", label: "Party Time", type: "text", required: true, placeholder: "e.g., 7:00 PM till late" },
      { name: "venue", label: "Venue Name & Address", type: "text", required: true, placeholder: "e.g., The Onyx Lounge, NYC" },
      { name: "dressCode", label: "Dress Code", type: "text", required: false, placeholder: "e.g., Black Tie & Gold Accents" },
      { name: "quote", label: "Invitation Quote", type: "text", required: false, placeholder: "e.g., Cheers to another fabulous year!" }
    ]
  },
  {
    _id: "tpl_corporate_gala",
    title: "Onyx Gala",
    category: "Corporate Events",
    previewImage: tplCorporate,
    price: "$34",
    templateCode: "corporate_gala",
    fields: [
      { name: "companyName", label: "Company/Host Name", type: "text", required: true, placeholder: "e.g., Aurelia Enterprises" },
      { name: "eventTitle", label: "Event Title", type: "text", required: true, placeholder: "e.g., Annual Excellence Awards Gala" },
      { name: "date", label: "Event Date", type: "date", required: true },
      { name: "time", label: "Event Time", type: "text", required: true, placeholder: "e.g., 6:30 PM Reception" },
      { name: "venue", label: "Venue Name & Address", type: "text", required: true, placeholder: "e.g., The Plaza Hotel Grand Ballroom" },
      { name: "speakerName", label: "Keynote Speaker (Optional)", type: "text", required: false, placeholder: "e.g., Dr. Elena Rostova" },
      { name: "agenda", label: "Event Agenda Summary", type: "textarea", required: false, placeholder: "e.g., 7:00 PM Awards, 9:00 PM Dinner..." }
    ]
  },
  {
    _id: "tpl_baby_botanica",
    title: "Blush Botanica",
    category: "Baby Shower",
    previewImage: tplBaby,
    price: "$22",
    templateCode: "baby_botanica",
    fields: [
      { name: "motherName", label: "Mother's Name", type: "text", required: true, placeholder: "e.g., Beatrice Smith" },
      { name: "date", label: "Event Date", type: "date", required: true },
      { name: "time", label: "Event Time", type: "text", required: true, placeholder: "e.g., 2:00 PM - 5:00 PM" },
      { name: "venue", label: "Venue Name & Address", type: "text", required: true, placeholder: "e.g., The Botanical Gardens Cafe" },
      { name: "registryUrl", label: "Gift Registry URL (Optional)", type: "text", required: false, placeholder: "e.g., https://babylist.com/..." },
      { name: "quote", label: "Welcome Note", type: "text", required: false, placeholder: "e.g., A little flower is on the way..." }
    ]
  }
];

export const templateService = {
  async getTemplates() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TEMPLATES);
      }, 300);
    });
  },

  async getTemplateById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tpl = MOCK_TEMPLATES.find((t) => t._id === id);
        if (tpl) {
          resolve(tpl);
        } else {
          reject(new Error("Template not found"));
        }
      }, 200);
    });
  }
};
