<link rel="stylesheet" href="css/contacts.css">

<div class="container">
<form action="https://formsubmit.co/a03f7d396e9d69d6facad7cd0ef9b9bb" method="POST" />

    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name.." / required 
      minlength="2">

    <label for="lname">Last Name</label>
    <input
      type="text"
      id="lname"
      name="lastname"
      placeholder="Your last name.."
      
      minlength="2"
      required
    />
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="example@email.com"
      pattern="+@.com"
      minlength="8"
      required
    />


    <label for="country">Country</label>
    <select id="country" name="country">
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="romania">Romania</option>
      <option value="hungary">Hungary</option>
      <option value="ukraina">Ukraina</option>
      <option value="russia">Russia</option>
      <option value="germany">Germany</option>
      <option value="england">England</option>
      <option value="usa">USA</option>
    </select>

    <label for="subject">Subject</label>
    <textarea
    type="text"
      id="subject"
      name="subject"
      placeholder="Write something.."
      style="height: 200px"
      required
      minlength="20"
    ></textarea>
    

    <input type="submit" value="Submit" />
  </form>
</div>