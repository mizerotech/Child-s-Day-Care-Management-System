export const childrenData = [
  { id: 1, name: 'Emma Johnson', age: 4, guardian: 'Sarah Johnson', phone: '555-0101', email: 'sarah.j@email.com', allergies: 'Peanuts', group: 'Sunflowers', image: null },
  { id: 2, name: 'Liam Smith', age: 3, guardian: 'Mike Smith', phone: '555-0102', email: 'mike.s@email.com', allergies: 'None', group: 'Butterflies', image: null },
  { id: 3, name: 'Olivia Brown', age: 5, guardian: 'Lisa Brown', phone: '555-0103', email: 'lisa.b@email.com', allergies: 'Dairy', group: 'Rainbows', image: null },
  { id: 4, name: 'Noah Davis', age: 4, guardian: 'Tom Davis', phone: '555-0104', email: 'tom.d@email.com', allergies: 'None', group: 'Sunflowers', image: null },
  { id: 5, name: 'Ava Wilson', age: 3, guardian: 'Amy Wilson', phone: '555-0105', email: 'amy.w@email.com', allergies: 'Gluten', group: 'Butterflies', image: null },
  { id: 6, name: 'Ethan Moore', age: 5, guardian: 'Chris Moore', phone: '555-0106', email: 'chris.m@email.com', allergies: 'None', group: 'Rainbows', image: null },
  { id: 7, name: 'Sophia Taylor', age: 4, guardian: 'Jane Taylor', phone: '555-0107', email: 'jane.t@email.com', allergies: 'Eggs', group: 'Sunflowers', image: null },
  { id: 8, name: 'Mason Anderson', age: 3, guardian: 'Paul Anderson', phone: '555-0108', email: 'paul.a@email.com', allergies: 'None', group: 'Butterflies', image: null },
]

export const staffData = [
  { id: 1, name: 'Ms. Rachel Green', role: 'Lead Teacher', email: 'rachel.g@daycare.com', phone: '555-0201', group: 'Sunflowers', startDate: '2021-03-15', status: 'Active' },
  { id: 2, name: 'Mr. David Lee', role: 'Assistant Teacher', email: 'david.l@daycare.com', phone: '555-0202', group: 'Butterflies', startDate: '2022-01-10', status: 'Active' },
  { id: 3, name: 'Ms. Karen White', role: 'Lead Teacher', email: 'karen.w@daycare.com', phone: '555-0203', group: 'Rainbows', startDate: '2020-08-20', status: 'Active' },
  { id: 4, name: 'Mr. James Clark', role: 'Aide', email: 'james.c@daycare.com', phone: '555-0204', group: 'Sunflowers', startDate: '2023-05-01', status: 'Active' },
  { id: 5, name: 'Ms. Nina Patel', role: 'Nurse', email: 'nina.p@daycare.com', phone: '555-0205', group: 'All', startDate: '2021-11-12', status: 'On Leave' },
]

export const activitiesData = [
  { id: 1, title: 'Morning Circle Time', description: 'Group discussion and calendar activities', group: 'All', time: '08:30', duration: '30 min', day: 'Daily' },
  { id: 2, title: 'Arts & Crafts', description: 'Creative painting and drawing session', group: 'Sunflowers', time: '10:00', duration: '45 min', day: 'Monday' },
  { id: 3, title: 'Story Time', description: 'Interactive reading and storytelling', group: 'Butterflies', time: '10:30', duration: '30 min', day: 'Tuesday' },
  { id: 4, title: 'Outdoor Play', description: 'Supervised playground activities', group: 'All', time: '11:00', duration: '60 min', day: 'Daily' },
  { id: 5, title: 'Music & Movement', description: 'Songs, dance, and rhythm activities', group: 'Rainbows', time: '14:00', duration: '30 min', day: 'Wednesday' },
  { id: 6, title: 'Science Exploration', description: 'Simple experiments and nature study', group: 'Sunflowers', time: '14:30', duration: '45 min', day: 'Thursday' },
]

export const mealsData = [
  { day: 'Monday', breakfast: 'Oatmeal & Fruit', lunch: 'Chicken & Veggies', snack: 'Apple Slices' },
  { day: 'Tuesday', breakfast: 'Yogurt & Granola', lunch: 'Mac & Cheese', snack: 'Crackers & Cheese' },
  { day: 'Wednesday', breakfast: 'Pancakes', lunch: 'Turkey Sandwich', snack: 'Banana' },
  { day: 'Thursday', breakfast: 'Eggs & Toast', lunch: 'Pasta & Salad', snack: 'Grapes' },
  { day: 'Friday', breakfast: 'Cereal & Milk', lunch: 'Pizza & Salad', snack: 'Veggie Sticks' },
]

export const weeklyAttendance = [
  { day: 'Mon', present: 18, absent: 4 },
  { day: 'Tue', present: 20, absent: 2 },
  { day: 'Wed', present: 17, absent: 5 },
  { day: 'Thu', present: 21, absent: 1 },
  { day: 'Fri', present: 15, absent: 7 },
]

export const attendanceTrends = [
  { week: 'Wk 1', rate: 82 },
  { week: 'Wk 2', rate: 88 },
  { week: 'Wk 3', rate: 79 },
  { week: 'Wk 4', rate: 91 },
  { week: 'Wk 5', rate: 85 },
  { week: 'Wk 6', rate: 93 },
]

export const groupDistribution = [
  { name: 'Sunflowers', value: 8 },
  { name: 'Butterflies', value: 7 },
  { name: 'Rainbows', value: 7 },
]

export const initialAttendanceLogs = [
  { id: 1, childId: 1, childName: 'Emma Johnson', date: '2024-01-15', checkIn: '08:15', checkOut: '16:30', status: 'Present' },
  { id: 2, childId: 2, childName: 'Liam Smith', date: '2024-01-15', checkIn: '08:45', checkOut: '15:00', status: 'Present' },
  { id: 3, childId: 3, childName: 'Olivia Brown', date: '2024-01-15', checkIn: null, checkOut: null, status: 'Absent' },
  { id: 4, childId: 4, childName: 'Noah Davis', date: '2024-01-15', checkIn: '09:00', checkOut: '16:00', status: 'Present' },
  { id: 5, childId: 5, childName: 'Ava Wilson', date: '2024-01-15', checkIn: '08:30', checkOut: null, status: 'Checked In' },
]
