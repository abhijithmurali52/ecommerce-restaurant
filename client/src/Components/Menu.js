// // //delete later
// {/* <nav id="navbar" style={{ ...navBarStyle, top: "-100px" }}>
// <div style={logoContainerStyle}>
//   <img
//     src={`${process.env.PUBLIC_URL}/reslogo.png`}
//     alt="Logo"
//     style={logoStyle}
//   />
//   <h2 style={{ margin: "0", fontSize: "20px" }}>Restaurant</h2>
// </div>

// <div>
//   <a
//     href="/"
//     style={navTextStyle(
//       hoveredLink === "home",
//       selectedLink === "home"
//     )}
//     onMouseEnter={() => setHoveredLink("home")}
//     onMouseLeave={() => setHoveredLink(null)}
//     onClick={() => setSelectedLink("home")}
//   >
//     HOME
//   </a>
//   <a
//     href="/about"
//     style={navTextStyle(
//       hoveredLink === "about",
//       selectedLink === "about"
//     )}
//     onMouseEnter={() => setHoveredLink("about")}
//     onMouseLeave={() => setHoveredLink(null)}
//     onClick={() => setSelectedLink("about")}
//   >
//     ABOUT
//   </a>
//   <a
//     href="/menu"
//     style={navTextStyle(
//       hoveredLink === "menu",
//       selectedLink === "menu"
//     )}
//     onMouseEnter={() => setHoveredLink("menu")}
//     onMouseLeave={() => setHoveredLink(null)}
//     // onClick={handleMenuClick}
//   >
//     MENU
//   </a>
//   <a
   
//     style={navTextStyle(
//       hoveredLink === "contact",
//       selectedLink === "contact"
//     )}
//     onMouseEnter={() => setHoveredLink("contact")}
//     onMouseLeave={() => setHoveredLink(null)}
//     onClick={handleContactClick}
//   >
//     CONTACT
//   </a>
// </div>
// {/* <input type="text" placeholder="Search..." style={searchBarStyle} /> */}
// <ul className="nav-links">
//   {!user && !admin ? (
//     <>
//       <div className="login-admin-box">
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         {/* <li><Link to="/adminlogin">Login as Admin</Link></li> */}
//       </div>
//     </>
//   ) : (
//     <div className="user-info-box">
//       {user && (
//         <>
//           <li>Welcome, {user.username}</li>
//           <li>
//             <button onClick={handleLogout} className="logout-button">
//               <FontAwesomeIcon icon={faSignOutAlt} /> Logout User
//             </button>
//           </li>
//         </>
//       )}
//       {admin && (
//         <>
//           <li>Welcome, {admin.username}</li>
//           <li>
//             <button onClick={adminLogout} className="logout-button">
//               <FontAwesomeIcon icon={faSignOutAlt} /> Logout Admin
//             </button>
//             <button
//               onClick={handleClick}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "10px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               <FontAwesomeIcon icon={faCog} />
//             </button>
//           </li>
//         </>
//       )}
//     </div>
//   )}
// </ul>
// </nav> */}