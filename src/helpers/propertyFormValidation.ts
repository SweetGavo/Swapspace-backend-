import Joi from 'joi';


const propertyFormSchema = Joi.object({

    property_title: Joi.string().required(),                      
    description: Joi.string().required(),                    
    rent: Joi.string().required(),                           
    property_type: Joi.string().required(),                
    structure: Joi.string().required(),                      
    sale_or_rent_price: Joi.string().required(),              
    price_prefix: Joi.string().required(),                  
    payment_frequency: Joi.string().required(),              
    payment_plan: Joi.string().required(),                                             
    video_url: Joi.string().required(),                      
    video_url_tour: Joi.string().required(),                  
    bedroom: Joi.string().required(),                          
    bathroom: Joi.string().required(),                         
    area_size: Joi.string().required(),                       
    size_postfix: Joi.string().required(),                     
    fire_place: Joi.string().required(),                      
    entry_floor: Joi.string().required(),                     
    parking_slot: Joi.string().required(),                     
    parking_lot: Joi.string().required(),                      
    year_built: Joi.string().required(),                       
    building_unit: Joi.string().required(),                   
    available: Joi.string().required(),                        
    renovation: Joi.string().required(),                      
    appliance: Joi.string().required(),                       
    category: Joi.string().required(),                         
    amenities: Joi.string().required(),                       
    additional_details: Joi.string(),              
    location: Joi.string().required(),                       
    emirate: Joi.string().required(),                          
    proximity: Joi.string().required(),                       
    street_Number: Joi.string().required(),                    
    locality: Joi.string().required(),                        
    postal_code: Joi.string().required(),                     
    style: Joi.string().required(),                           
    view: Joi.string().required(),                             
    pet: Joi.string().required(),                              
    specification: Joi.string().required(),                    
    floor_plan: Joi.string().required(),                       
    total_lessee: Joi.string().required(),                  
    price: Joi.string().required(),                           
    message: Joi.string().required(),                          
    realtorId: Joi.string(),
    userId:Joi.string().required()                  
    
  });

  export default propertyFormSchema;