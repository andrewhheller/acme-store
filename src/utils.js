const stateAbbrev = [
  'AL', 
  'AK', 
  'AZ', 
  'AR', 
  'CA', 
  'CO', 
  'CT', 
  'DE', 
  'FL', 
  'GA', 
  'HI', 
  'ID', 
  'IL', 
  'IN', 
  'IA', 
  'KS', 
  'KY', 
  'LA', 
  'ME', 
  'MD', 
  'MA', 
  'MI', 
  'MN', 
  'MS', 
  'MO', 
  'MT', 
  'NE', 
  'NV', 
  'NH', 
  'NJ', 
  'NM', 
  'NY', 
  'NC', 
  'ND', 
  'OH', 
  'OK', 
  'OR', 
  'PA', 
  'RI', 
  'SC', 
  'SD', 
  'TN', 
  'TX', 
  'UT', 
  'VT', 
  'VA', 
  'WA', 
  'WV', 
  'WI', 
  'WY'
]

// form input field focus
const formFocus = fields => {

  fields.forEach(field => {

    const _field = document.getElementById(field)
  
    _field.addEventListener('focus', 
      () => _field.style.backgroundColor = "yellow"
    )
    
    _field.addEventListener('blur', 
      () => _field.style.backgroundColor = "white"
    )
  });
  
}



export {
  stateAbbrev,
  formFocus
}
