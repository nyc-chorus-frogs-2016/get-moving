class EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
      return 'Event saved'
    else
      return 'Event not saved'
    end
  end

  def event_params
    params.require(:event).permit(:name, :address, :user_email, :start_time, :departure_time)
  end

end
