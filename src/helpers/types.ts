import { AMENITIES, APPLAINCES, Agent_type, Availablity_Type, CATEGORY, EMIRATE, PAYMENT_PLAN, PET, PROPERTY_TYPES, PROXIMITY, Property_Status, RENT, SPECIFICATION, STRUCTURE, STYLE, Status_type, Type, View } from "@prisma/client";

export type OtpDataType = {
  subject: string;
  otp: string;
};

export type PrepareMailDataType = {
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  senderName: string;
  senderEmail: string;
};

export type PrepareAzureMailDataType = {
  senderAddress:string;
  subject:string;
  plainText:string;
  address:string;
  displayName:string;
}

export type SendMailDataType = {
  senderName: string;
  senderEmail: string;
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  mailAttachments?: string;
};


export type AzureMailDataType = {
  senderAddress: string;
  subject: string;
  plainText: string;
  address: string;
  displayName:string;
}


export type InvitationDataType = {
  subject: string;
  invitationLink: string;
  email: string;
}

export type PasswordDataType = {
  subject: string;
  otp: string;
  
}  



export type PropertyDataType = {
  id?: number;
  property_title: string;
  property_type: PROPERTY_TYPES;
  structure: string;
  listing_type: string;
  style: string;
  view: string;
  utility_payment: string;
  year_built: string;
  pets_allowed: string;
  available: string;
  sale_or_rent_price: string;
  price_prefix: string;
  payment_frequency: string;
  payment_plan: string;
  langitude?: any;
  latitude?: any;
  country: string;
  street_Number: string;
  locality: string;
  postal_code: string;
  logistics: string;
  parking_lot: string;
  parking_slots: string;
  fire_place: string;
  entry_floor: string;
  room_list: string;
  bedroom: string;
  bathroom: string;
  pool: string;
  building_unit: string;
  unit_amenities: string[];
  specification: string;
  video_url: string;
  video_url_tour: string;
  utilities: string[];
  date_posted: string;
  property_price: string;
  total_lessee: string;
  permit: string;
  description: string;
  additional_details: string;
  additional_facilities_and_amenities: string;
  proximate_landmark: string;
  realtorId: number;
  renovation?:string;
  availablity: Availablity_Type
  satus: Property_Status
}


export type AgentDataType = {
  email: string;
  number: string;
  password: string;
  type: Type
}


export type FavortiteDataType =  {
  propertyId: number;
  userId: number; 
}


export type RealtorDataType = {
  id?: number;
  userId: number;
  company_name: string;
  address: string;
  broker_BRN: string;
  agent_ORN: string;
  years_of_experience: string;
  specialty: string[];
  role: Agent_type;
  language: string[];
  description: string;
  license_number: string;
  broker_card_image: string[];
  status:Status_type
  image?:string;
}


export type LandLordDataType = {
  id?: number;
        property_title:string;
        description:string;
        rent:RENT;
        property_type:PROPERTY_TYPES
        structure:STRUCTURE
        sale_or_rent_price:string;
        price_prefix:string;
        payment_frequency:string;
        payment_plan:PAYMENT_PLAN;
        video_url:string;
        video_url_tour:string;
        bedroom:string;
        bathroom:string;
        area_size:string;
        size_postfix:string;
        fire_place:string;
        entry_floor:string;
        parking_slot:string;
        parking_lot:string;
        year_built:string;
        building_unit:string;
        available:string;
        renovation:string;
        appliance:APPLAINCES;
        category:CATEGORY;
        amenities: AMENITIES;
        additional_details?:string;
        location:string;
        emirate:EMIRATE;
        proximity:PROXIMITY;
        street_Number:string;
        locality:string;
        postal_code:string;
        style:STYLE;
        view:View;
        pet:PET;
        specification:SPECIFICATION;
        floor_plan:string;
        total_lessee?:string;
        price:string;
        message?:string;
        images?: string[] | undefined;
        userId: number;
        realtorId?:number;
        property_document:string[];
}