# makeUofT2024
# **Hackathon Project Charter: Cybersecurity Chrome Extension**

---

## **Project Overview**  
Develop a Chrome extension that improves cybersecurity awareness by identifying impersonation sites and providing online safety tips.

---

## **Gap/Problem**  
- Users often fall victim to phishing through malicious URLs that mimic legitimate websites.  
- There is a need for easy-to-access tools that inform users if a site is suspicious and provide quick security advice.

---

## **Scope**  
1. **Core Features**:  
   - URL verification: Detect if the site is an impersonation.  
   - AI-backed site analysis for additional risk assessment (using a lightweight API).  
   - PSA message with essential online safety tips upon interaction with the extension.  

2. **User Interaction**:  
   - One-click interaction with the Chrome extension to scan the current page.  
   - Display result: "Safe" / "Suspicious" / "Unknown" with recommendations.

---

## **Existing Technologies to Use**  
1. **Chrome Extension API** – Build and deploy the browser extension.  
2. **AI/ML API for Site Detection** (e.g., ChatGPT, Google Safe Browsing API).  
3. **JavaScript & HTML/CSS** – Extension frontend.  
4. **Regular Expressions (RegEx)** – Detect suspicious patterns in URLs.  

---

## **Elements Needed for Development Plan**  
| **Task**                         | **Details**                              | **Time Estimate** |
|-----------------------------------|------------------------------------------|------------------|
| **Extension Setup**               | Build basic Chrome extension structure  | 3 hrs            |
| **URL Parsing Logic**             | Use RegEx to detect misspelled URLs      | 4 hrs            |
| **AI API Integration**            | Add lightweight API call to check risk  | 5 hrs            |
| **UI Design**                     | Simple popup with analysis & tips       | 3 hrs            |
| **Testing & Debugging**           | Test multiple phishing URLs and legit ones | 5 hrs            |
| **Documentation & Final Touches** | Write brief README and polish UI        | 4 hrs            |

---

## **Resources Needed**  
- **Chrome Dev Account** for extension deployment (if publishing).  
- **Access to AI/ML API** with lightweight requests (optional: Google Safe Browsing, ChatGPT).  
- Basic web development tools (VSCode, GitHub for version control).

---

## **Success Criteria**  
- The extension identifies phishing URLs with high accuracy.  
- Clear and concise PSA messages display on click.  
- Fully functioning within 24 hours with no critical bugs.
