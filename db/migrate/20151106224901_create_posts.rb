class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.text :message
      t.string :user
      t.timestamps null: false
    end
  end
end
