import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');


Meteor.methods({
	'notes.insert'(text) {

		//checks that entered text is a string
		check(text, String);
        
        //checks if user is logged-in
		if (!Meteor.userId) {
			throw new Meteor.error("Not authorized");
		}
        //finally inserts the text
			Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});			
	},

   'notes.remove' (note) {
    //checks if the logged in user created the note which he wants to close
    if (note.owner !== Meteor.userId()) {
    throw new Meteor.Error("You didn't create this note, so you can't delete it!");
       }
   	//removes the note from collection 
    check(note._id, String);
    Notes.remove(note._id);
   }
});
