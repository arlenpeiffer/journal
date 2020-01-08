import * as Yup from 'yup';

export const entryFormSchema = Yup.object().shape({
  appointments: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Appointment type is required.'),
      practitioner: Yup.string().required('Practitioner name is required.'),
      notes: Yup.string()
    })
  ),
  date: Yup.number().typeError('Date is required.'),
  food: Yup.object().shape({
    diet: Yup.object().shape({
      type: Yup.string(),
      notes: Yup.string()
    }),
    meals: Yup.array().of(
      Yup.object().shape({
        type: Yup.number().required('Meal type is required.'),
        time: Yup.number(),
        items: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required('Meal item name is required.'),
              portion: Yup.string().required('Meal item portion is required.'),
              ingredients: Yup.array(),
              notes: Yup.string()
            })
          )
          .min(1, 'Meal must have at least one item.'),
        notes: Yup.string()
      })
    )
  }),
  medication: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Medication type is required.'),
      dose: Yup.number()
        .required('Medication dose is required.')
        .typeError('Medication dose must be a number.'),
      notes: Yup.string()
    })
  ),
  mood: Yup.array(),
  movement: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Movement type is required.'),
      notes: Yup.string()
    })
  ),
  notes: Yup.string(),
  pain: Yup.object().shape({
    level: Yup.number().typeError('Pain level is required.'),
    details: Yup.string(),
    nsaid: Yup.object().shape({
      amountTaken: Yup.number().when('isTaken', {
        is: true,
        then: Yup.number()
          .min(1, 'Amount must be greater than zero.')
          .typeError('Gotta be a number, sorry.'), // keep exploring how to validate for number or ''
        otherwise: Yup.number().typeError('Gotta be a number, sorry.') // keep exploring how to validate for number or ''
      }),
      isTaken: Yup.boolean(),
      timesTaken: Yup.number().when('isTaken', {
        is: true,
        then: Yup.number()
          .min(1, 'Number of times must be greater than zero.')
          .typeError('Gotta be a number, sorry.'), // keep exploring how to validate for number or ''
        otherwise: Yup.number().typeError('Gotta be a number, sorry.') // keep exploring how to validate for number or ''
      }),
      type: Yup.string().when('isTaken', {
        is: true,
        then: Yup.string().required('Please select an NSAID type.'),
        otherwise: Yup.string()
      })
    })
  }),
  sleep: Yup.object().shape({
    amount: Yup.number().min(0, 'Sleep amount is required.'),
    rating: Yup.number().min(1, 'Sleep rating is required.'),
    notes: Yup.string()
  }),
  stomach: Yup.object().shape({
    rating: Yup.number(),
    notes: Yup.string()
  }),
  stress: Yup.object().shape({
    level: Yup.number().nullable(),
    notes: Yup.string()
  }),
  supplements: Yup.array(),
  travel: Yup.object().shape({
    isTraveling: Yup.boolean(),
    location: Yup.string().required('Location name is required.')
  })
});
