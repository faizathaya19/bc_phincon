'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('tryout_sections', [
      {
        id: uuidv4(),
        code: 'SECTION-MATH',
        title: 'Math Section',
        description: 'Mathematics basic aptitude section.',
        order: 1,
        data: JSON.stringify({ level: 'basic', duration: '30 mins' }),
        tag: 'math',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: 'SECTION-VERBAL',
        title: 'Verbal Section',
        description: 'Verbal reasoning and comprehension.',
        order: 2,
        data: JSON.stringify({ level: 'intermediate', duration: '25 mins' }),
        tag: 'verbal',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: 'SECTION-LOGIC',
        title: 'Logical Reasoning Section',
        description: 'Section to assess logical reasoning.',
        order: 3,
        data: JSON.stringify({ level: 'advanced', duration: '20 mins' }),
        tag: 'logic',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('tryout_sections', null, {})
  },
}
