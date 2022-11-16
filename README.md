Final project &ndash; A personal blogging system &ndash; Starter project
==========

## Hardy Herons Travel Website

Ths website is designed to function as a travel blog site where users can create accounts, sign in and share posts with all who view the website about various travel destinations with 
images of these locations. Users can also post comments on other users posts when signed in.

### Compulsory features

1. User can create a new account with all required data.
2. Users are notified immediately when their username choice is taken.
3. Two password boxes exist on account creation to ensure the same password is selected.
4. Avatar icons are available on account creation and are associated in the db to the user.
5. Log in and log out functionality works well.
6. Passwords are not stored in plaintext in the database, bcrypt was utilized to salt and hash the password.
7. Articles are readily available to all visitors regardless of sign-in status.
8. When logged in users can create posts on the home page and edit and delete posts on the profile/admin page.
9. We used tinymce as our WYSIWYG editor, this allows users to post images any where they like on their post and adds the functionality tinymce brings to text editing.<br/> *note: We are currently unable to store images on the server side and they are stored as a blob on the database.*
10. Users can edit and delete their account through the profile page.
11. Website has been designed with a consistent feel by similar styling rules throughout the website and utilizing CSS variables for a consistent and easy to manage coloring system.

### Extra features
Our inital features post is below:
* Implement an optional dark mode using CSS.
* Add button for article preview/summary using a modal with a 'read more' button which takes the user to the full article.
* Add functionality for users to comment on posts.
* Add a share button via facebook<br/>
<br/>
We managed to implement all features in a way that worked for the website, this required making a few changes to the initial description. For instance instead of using a modal for the article preview we used a collapsible accordian style to view posts. Also we decided to add a share to twitter button alonbgside the Facebook share button.

### Database file name (*.db file)
The database file should be named: project-database.db

### Username/password combination for testing
Username: ScoobyDoo<br/>
Password: pa55word

### Authors
- Sarah Quinn
- Kim Signell
- Maddie Pascoe
- Dane Graham
