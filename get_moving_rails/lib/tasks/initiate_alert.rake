task :alert_apple => :environment do
  event_to_alert = Event.find_by(name: 'Job Interview at Google')
  puts "Send a push notification for '#{event_to_alert.name}' to Apple."
end

task :find_upcoming => :environment do
  alert_range =
  if Event.where(departure_time: (Time.now)..(Time.now + 600)).where(has_notified: false).empty?
    puts "You have no events in the next 10 minutes, go relax for a bit"
  else
  events_to_alert = Event.where(departure_time: (Time.now)..(Time.now + 600)).where(has_notified: false).each do |event|
      puts "event is " + ((event.departure_time - Time.now)/60).to_s + " minutes away"
      puts "Send a push notification for '#{event.name}' to Apple."
      #this part uses Heroku
      event.update_attributes(has_notified: true)
    end
  end
end

