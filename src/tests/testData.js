export const filters = {
  date: {
    startDate: 1567296000000, // Sunday, September 1, 2019 12:00:00 AM
    endDate: 1569801600000 // Monday, September 30, 2019 12:00:00 AM
  },
  sortOrder: 'oldestFirst',
  text: 'avocado'
};

export const journal = [
  {
    date: 1567296000000, // Sunday, September 1, 2019 12:00:00 AM
    food: {
      diet: {
        type: 'Elimination',
        notes: 'testEntry1'
      },
      meals: [
        {
          type: 1,
          time: 1567342800000, // Sunday, September 1, 2019 1:00:00 PM
          items: [
            {
              name: 'testEntry1',
              portion: 'testEntry1',
              ingredients: 'testEntry1',
              notes: 'testEntry1'
            }
          ],
          notes: 'testEntry1'
        }
      ]
    },
    id: 'testEntry1',
    mood: ['testEntry1'],
    movement: [
      {
        type: 'testEntry1',
        details: 'testEntry1'
      }
    ],
    notes: 'testEntry1',
    pain: {
      level: 1,
      details: 'testEntry1',
      nsaid: {
        amountTaken: 0,
        isTaken: false,
        timesTaken: 0,
        type: ''
      }
    },
    sleep: {
      amount: 3600000,
      rating: 1,
      notes: 'testEntry1'
    },
    stomach: {
      rating: 1,
      notes: 'testEntry1'
    },
    supplements: ['testEntry1'],
    travel: {
      isTraveling: false,
      location: 'Home'
    }
  },
  {
    date: 1567382400000, // Monday, September 2, 2019 12:00:00 AM
    food: {
      diet: {
        type: 'Elimination',
        notes: 'testEntry2'
      },
      meals: [
        {
          type: 2,
          time: 1567432800000, // Monday, September 2, 2019 2:00:00 PM
          items: [
            {
              name: 'testEntry2',
              portion: 'testEntry2',
              ingredients: 'testEntry2',
              notes: 'testEntry2'
            }
          ],
          notes: 'testEntry2'
        }
      ]
    },
    id: 'testEntry2',
    mood: ['testEntry2'],
    movement: [
      {
        type: 'testEntry2',
        details: 'testEntry2'
      }
    ],
    notes: 'testEntry2',
    pain: {
      level: 2,
      details: 'testEntry2',
      nsaid: {
        amountTaken: 0,
        isTaken: false,
        timesTaken: 0,
        type: ''
      }
    },
    sleep: {
      amount: 7200000,
      rating: 2,
      notes: 'testEntry2'
    },
    stomach: {
      rating: 2,
      notes: 'testEntry2'
    },
    supplements: ['testEntry2'],
    travel: {
      isTraveling: false,
      location: 'Home'
    }
  }
];

export const logs = {
  food: ['avocado'],
  movement: ['yoga'],
  nsaid: ['Advil', 'Aleve'],
  supplements: [
    'Cod Liver Oil',
    'Magnesium',
    'MSM',
    'Vitamin D3',
    "Lion's Mane",
    'Cordyceps'
  ]
};

export const userInfo = {
  id: 'userId',
  isLoggedIn: true
};
