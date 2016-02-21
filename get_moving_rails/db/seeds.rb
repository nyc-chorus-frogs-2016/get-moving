# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Event.create!(name: 'Job Interview at Google',
              address: '1600 Amphitheatre Parkway in Mountain View, Santa Clara County, California',
              user_email: 'getmovingfinalproject@gmail.com',
              start_time: DateTime.parse('2016-02-22T10:15:00+00:00'),
              departure_time: DateTime.parse('2016-02-22T09:15:00+00:00')
              )
