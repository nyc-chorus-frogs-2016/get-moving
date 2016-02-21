# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Event.create!(name: 'Job Interview at Apple',
              address: '1 Infinite Loop, Cupertino, California 95014',
              user_email: 'getmovingfinalproject@gmail.com',
              start_time: DateTime.parse('2016-02-24T09:15:00+00:00'),
              departure_time: DateTime.parse('2016-02-24T08:15:00+00:00')
              )

Event.create!(name: 'Job Interview at Google',
              address: '1600 Amphitheatre Parkway in Mountain View, Santa Clara County, California',
              user_email: 'getmovingfinalproject@gmail.com',
              start_time: DateTime.parse('2016-02-22T10:15:00+00:00'),
              departure_time: DateTime.parse('2016-02-22T09:15:00+00:00')
              )

Event.create!(name: 'Job Interview at Facebook',
              address: '1 Hacker Way, Palo Alto, California 12345',
              user_email: 'getmovingfinalproject@gmail.com',
              start_time: DateTime.parse('2016-02-24T09:15:00+00:00'),
              departure_time: DateTime.parse('2016-02-24T08:15:00+00:00')
              )

Event.create!(name: 'Job Interview at Duane Reed',
              address: '60 Wall street',
              user_email: 'getmovingfinalproject@gmail.com',
              start_time: DateTime.parse('2016-02-21T21:05:21+00:00'),
              departure_time: DateTime.parse('2016-02-21T21:39:21+00:00')
              )
