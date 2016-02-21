class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :address
      t.string :user_email
      t.datetime :start_time
      t.datetime :departure_time
      t.boolean  :is_latest, default: true
      t.boolean  :has_notified, default: false

      t.timestamps null: false
    end
  end
end

