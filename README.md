# Bloom

## To run:
- Clone the repository
- Ensure you have npm downloaded (brew install node and npm -v will ensure you have an npm version)
- npm install.
- npm start.
- Go to http://localhost:8080/ to see the site.

---

## UI Rundown

The Bloom site currently has three pages.
- Home Page
- Login Page
- Tutorial Page

### The Home Page consists of
- a **Login** Button which you click to access the **Login Page**
- a **Get Started** Button which you click to access the **Tutorial Page**

### The Login Page 
- is **currently non-functional** and has a basic UI setup that will be redesigned at a later date

### The Tutorial Page consists of
- A **Tree List** running vertically along the left-hand side
- A **Tool Bar** running along the top
- A **Recommended Playlist** running along the bottom
- A **Tree Space** in between the Tool Bar and the Recommended Playlist where your tree will appear once you begin to add nodes

#### The **Tree List is currently non-functional**. 

This is why the two trees under "Pop Recs" are faded out in a disabled state. Eventually, this will have a list of all the trees that you have made and saved, and you will be able to click on the title to switch to view that tree.

#### The **Tool Bar has one functional button** right now. 

The button that is third from the left and looks like a little sapling is used to **add nodes**. It is between the button that looks like a plus sign and the one that looks like a pair of scissors. Clicking this button brings up a text input bar in the tree space where you can begin typing letters to find a song to add. Note: it is best to just type a few letters and wait for suggestions, as it takes a while to load the suggestions, and to not have a super specific song in mind, as our database is small. Clicking on a song will add it as a node. Keep clicking the add node button if you want to add more songs.

#### The **Recommended Playlist has two functional buttons**. 
The **play button** on the far left that you use *after* clicking the **recommend button** on the far right. Click on the **recommend button** after you have added all the nodes you want. The playlist should then indicate that it is loading the recommendations. Then wait until the playlist becomes filled with recommendations. (8 squares should appear). This will take some time. If you then click the **play button**, the recommended songs will be added into a Spotify playlist (the account and playlist they are added to are hard coded right now).

#### **Notes:**

*The nodes changing color when you click on them currently means nothing, but the color switching capabilities will be used for a new feature in the future*.

*We currently have no way to delete nodes when they are added, so the recommendations are currently based on all the songs you have added thus far, regardless of if you refresh the pages and have the nodes seem to disappear*.

*The Tutorial Page will eventually have instructions to show you what to click and guide you through the process.*

---
## Team: 
 - Alaina Arnold
 - Claire Collins
 - Connor Spencer
 - Elias Rosenberg
 - Addison Wessel