task :alert_apple => :environment do
  event_to_alert = Event.find_by(name: 'Job Interview at Google')
  puts "Send a push notification for '#{event_to_alert.name}' to Apple."
end

task :find_upcoming => :environment do
  if Event.where(:departure_time => (Time.now)..(Time.now + 300)).empty?
    puts "You have no events in the next 5 minutes, go relax for a bit"
  else
    event_to_alert = Event.where(:departure_time => (Time.now)..(Time.now + 300)).first
    puts "event is " + ((event_to_alert.departure_time - Time.now)/60).to_s + " minutes away"
    puts "Send a push notification for '#{event_to_alert.name}' to Apple."
  end
end

# Find the next upcoming event:
# Event.where("departure_time >= ?", Date.today).order_by("created_at ASC").limit(1)
