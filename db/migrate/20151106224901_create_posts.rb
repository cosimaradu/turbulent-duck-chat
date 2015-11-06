class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :message
      t.string :user
      t.timestamps null: false
    end
  end
end
