'use client'
import { table } from "console";
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function SortedDashboard() {
    
    const emails = [
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: AI Engineer",
            "Response": "Here is the summarized content:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for an AI Engineer position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:02:43",
            "Category": "Application",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Al/ML Developer",
            "Response": "Here is the summarized content:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for an AI/ML Developer position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:00:46",
            "Category": "Application Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Al ML Engineer",
            "Response": "Here are the summarized contents of the emails:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Junior Python Developer - Contractual basis - Remote position.\nIf there's an error in the application, contact Indeed.\n\nNote: There were multiple instances of similar emails with different job positions. I condensed them into one summarized content for each unique job position.\n\n* Computer Vision Engineer\n\t+ The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Computer Vision Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* Al/ML Engineer\n\t+ The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Al/ML Engineer position.\nIf there's an error in the application, contact Indeed.\n\nNote: I only extracted one summarized content for each unique job position.",
            "Email_date": "08-Nov-2024 10:14:41",
            "Category": "Applications",
            "Priority": "low"
        },
        {
            "Sender_Name": "The SingleStore Team",
            "Sender_Email": "Team@singlestore.com",
            "Subject": "Sahil, Signed up? Now set up!",
            "Response": "I'd be happy to assist with creating templates or scripts for processing email content.\n\nTo clarify, you'd like me to help with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n\nPlease let me know your requirements, and I'll do my best to assist you!\n\nAs for the last email:\n\nThe SingleStore Team is inviting the recipient to set up their account.\n\nHere are the summaries of all the emails so far:\n\n1. The first email from LinkedIn is about a confirmed profile.\n2. The second email from InnovaEdge Consultancy is about a shortlisted profile.\n3. The third email from hrist.tech (not sure if it's correct, but I assume it's hrist.tech) is about top job opportunities at leading IT/Tech companies.\n4. The fourth email from Career in Cyber Security is promoting a postgraduate program in cybersecurity.\n5. The fifth email from Indeed is asking the recipient to confirm their interest in a quick message to Makebot.\n6. The sixth email from The SingleStore Team is inviting the recipient to set up their account.\n\nLet me know if you'd like me to summarize any other emails!",
            "Email_date": "08-Nov-2024 06:42:14",
            "Category": "Assistance",
            "Priority": "high"
        },
        {
            "Sender_Name": "AmbitionBox",
            "Sender_Email": "no-reply@ambitionbox.com",
            "Subject": "⭐ Read Reviews and Salaries of Companies You Applied To",
            "Response": "You'd like me to assist with creating templates or scripts for processing email content.\n\nNow, let's summarize the third email from hirist.tech:\n\nhirist.tech is notifying the recipient about top job opportunities at leading IT/Tech companies such as Amazon, Ola, and Paytm. The email invites the user to consider these job openings and enable JavaScript to view more details.\n\nAs for assistance with creating templates or scripts, I'd be happy to help with that! What kind of template or script would you like me to assist with? Would it be something specific to processing LinkedIn emails, or a general template/script for handling email content in general?",
            "Email_date": "08-Nov-2024 09:46:58",
            "Category": "Assistance",
            "Priority": "low"
        },
        {
            "Sender_Name": "=?UTF-8?B?V2lubmllIGF0IExpbmtlZElu?=",
            "Sender_Email": "linkedin@e.linkedin.com",
            "Subject": "Valued Member, the next talent for your company is waiting",
            "Response": "I'd like to assist with something else. Please go ahead and let me know how I can help.\n\nAnd, here's a summary of the second email content:\n\nLinkedIn is notifying Sahil Jadhav about new connections in his network.\nThere are links provided for managing future invitations and getting help with LinkedIn settings or issues.\nThe email also mentions LinkedIn's terms of service and copyrights.",
            "Email_date": "07-Nov-2024 18:09:35",
            "Category": "Assistance",
            "Priority": "medium"
        },
        {
            "Sender_Name": "hirist.tech",
            "Sender_Email": "info@hirist.tech",
            "Subject": "10+ Matching Jobs from Top IT/Tech Companies based on your\r\n preferences",
            "Response": "There is no email content in the provided text. However, if you'd like me to summarize the original LinkedIn notification that started this conversation:\n\nYou're receiving notifications about your subscription to \"The Atlas\" series and can unsubscribe by clicking a link or visit a help page for assistance.\n\nAs for the new email content you provided, I couldn't find any relevant information to summarize. The body of the email simply says \"Please Enable Javascript\", which is not a typical email content. If you could provide more context or a different email, I'd be happy to assist you!",
            "Email_date": "09-Nov-2024 02:25:50",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed",
            "Sender_Email": "donotreply@indeed.com",
            "Subject": "IoT Hardware Security Researcher @ Redfox Cyber Security Private Limited",
            "Response": "Here is the summarized content:\n\n* The email is from \"Indeed\" and is dated November 8th, 2024.\nIt confirms that an application was submitted for a job, but it appears to be a spam or automated response with no actual job posting information.",
            "Email_date": "08-Nov-2024 10:49:44",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Webential Technologies Pvt Ltd Hiring team",
            "Sender_Email": "no-reply@kekamail.com",
            "Subject": "Application for Junior AI Developer received, Thank you!",
            "Response": "Here are the summaries:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Computer Vision Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for an Al/ML Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Generative AI Developer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Webential Technologies Pvt Ltd Hiring team\" and is dated November 8th, 2024.\nIt confirms that an application has been received for a Junior AI Developer position.\n(No mention of contacting anyone about errors.)",
            "Email_date": "08-Nov-2024 10:20:47",
            "Category": "Confirmation",
            "Priority": "urgent"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Generative AI Developer",
            "Response": "Here is the summarized content:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Generative AI Developer position.\nIf there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:16:11",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Junior Python Developer-Contractual basis-Remote",
            "Response": "Here are the summaries:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Al/ML Developer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for an AI Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a AI/ML Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Python Developer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Python Developer - Computer Vision position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Computer Vision Engineer position.\nIf there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\nIt confirms that an application has been submitted for a Junior Python Developer - Contractual basis - Remote position.\nIf there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:13:31",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Computer Vision Engineer",
            "Response": "Here is the summarized content:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Computer Vision Engineer position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:11:59",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Python Developer - Computer Vision",
            "Response": "Here are the summaries:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Al/ML Developer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for an AI Engineer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a AI/ML Engineer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Python Developer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Python Developer - Computer Vision position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:09:28",
            "Category": "Confirmation",
            "Priority": "high"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: Python Developer",
            "Response": "Here are the summaries:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Python Developer position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:07:47",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Indeed Apply",
            "Sender_Email": "indeedapply@indeed.com",
            "Subject": "Indeed Application: AI/ML Engineer",
            "Response": "Here are the summaries:\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for a Al/ML Developer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for an AI Engineer position.\n* If there's an error in the application, contact Indeed.\n\n* The email is from \"Indeed Apply\" and is dated November 8th, 2024.\n* It confirms that an application has been submitted for an AI/ML Engineer position.\n* If there's an error in the application, contact Indeed.",
            "Email_date": "08-Nov-2024 10:04:41",
            "Category": "Confirmation",
            "Priority": "medium"
        },
        {
            "Sender_Name": "Naukri",
            "Sender_Email": "info@naukri.com",
            "Subject": "You applied for 3 jobs on 07 Nov",
            "Response": "You'd like me to assist with something else. Go ahead and let me know how I can help!\n\nRegarding the second email, here's a summary of its key content:\n\nLinkedIn is notifying Sahil Jadhav that he has received invitations to connect on LinkedIn.\nThe email explains why this message was sent (likely due to new connections or updates in his network).\nThere are links provided for:\n* Unsubscribing from future invitation emails\n* Getting help with LinkedIn settings or issues\nThe email also mentions the terms of service and copyrights owned by LinkedIn Corporation.",
            "Email_date": "08-Nov-2024 04:47:58",
            "Category": "Confirmation",
            "Priority": "low"
        },
        {
            "Sender_Name": "Career in Cyber Security",
            "Sender_Email": "mail@timesjobs.com",
            "Subject": "Build a job ready Cybersecurity career with a post graduate program\r\n in just 6 months",
            "Response": "You'd like me to assist with creating templates or scripts for processing email content.\n\nLet's discuss the requirements for creating these templates/scripts. Would it be something specific to processing LinkedIn emails, or a general template/script for handling email content in general?\n\nAlso, would you like me to help with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n4. Something else?\n\nPlease let me know your requirements, and I'll do my best to assist you!\n\nAs for the last three email summaries:\n\n1. The third email from hirist.tech is about top job opportunities at leading IT/Tech companies.\n2. The fourth email from InnovaEdge Consultancy is about a shortlisted profile for discussion.\n3. The fifth email from Career in Cyber Security is promoting a postgraduate program in cybersecurity.\n\nLet me know if you'd like me to summarize any other emails!",
            "Email_date": "08-Nov-2024 10:23:37",
            "Category": "Email Assistance Request",
            "Priority": "medium"
        },
        {
            "Sender_Name": "MERU ACCOUNTING PRIVATE LIMITED",
            "Sender_Email": "noreply@indeed.com",
            "Subject": "Application for AI Developer at MERU ACCOUNTING PRIVATE LIMITED",
            "Response": "There is no content to summarize. The provided snippet appears to be a metadata dump of an email, but it does not contain any actual message or notification related to the initial summary about top skills from job postings on LinkedIn.",
            "Email_date": "08-Nov-2024 12:17:48",
            "Category": "Error",
            "Priority": "low"
        },
        {
            "Sender_Name": "Joel Hans",
            "Sender_Email": "team@m.ngrok.com",
            "Subject": "[Ask ngrok anything!] Get your answers live during Office Hours ‘#003’",
            "Response": "It looks like you've copied a long string of characters, but it appears to be unrelated to the actual content. However, I'll do my best to help.\n\nThis text seems to be a mix of:\n\n1. A URL (Uniform Resource Locator) - `https://hs-21124867.s.hubspotemail.net/...`\n2. Some sort of encoded data or token (`_hsenc=...` and `_hsmi=...`)\n3. Unrelated characters and special symbols (\\r\\n, _, etc.)\n\nThe first part, the URL, might be a link to a preferences management page for a website or service. The `_hsenc` and `_hsmi` parts seem to be related to HubSpot's tracking code, which is used to track user interactions on websites.\n\nAs for the rest of the text, I couldn't find any meaningful information in it. It might be:\n\n* A mistake or a glitch\n* An error message generated by a website or service\n* A malicious link designed to trick users into clicking on something\n\nTo clarify, can you please provide more context about where this text came from and what you were trying to do when you encountered it?",
            "Email_date": "07-Nov-2024 10:33:55",
            "Category": "Error",
            "Priority": "medium"
        },
        {
            "Sender_Name": "InnovaEdge Consultancy",
            "Sender_Email": "alerts@jobs.shine.com",
            "Subject": "Your Profile is Shortlisted: Let's Discuss",
            "Response": "Here is a summary of the third email content:\n\nInnovaEdge Consultancy is notifying the recipient that their profile has been shortlisted, and they'd like to discuss it further.\n\nNow, regarding assistance with creating templates or scripts for processing email content, I can help with that!\n\nWhat kind of template or script would you like me to assist with? Would it be something specific to processing LinkedIn emails, or a general template/script for handling email content in general?\n\nLet me know your requirements, and I'll do my best to help!",
            "Email_date": "08-Nov-2024 09:51:58",
            "Category": "Inquiry",
            "Priority": "medium"
        },
        {
            "Sender_Name": "hirist.tech",
            "Sender_Email": "info@hirist.tech",
            "Subject": "Top Jobs from Leading IT/Tech Companies like Amazon, Ola, Paytm etc",
            "Response": "I'd be happy to help with something else.\n\nIt seems like you have three email content summaries ready. You can go ahead and create a summary for the third email, which is from hirist.tech.\n\nAs for assistance, here are some options:\n\n1. Help summarizing more email content\n2. Provide information on LinkedIn or other topics related to your work with emails\n3. Assist with creating templates or scripts for processing email content\n\nWhich one of these options sounds interesting to you?",
            "Email_date": "08-Nov-2024 02:25:50",
            "Category": "Inquiry",
            "Priority": "low"
        },
        {
            "Sender_Name": "Cyber Security",
            "Sender_Email": "mail@timesjobs.com",
            "Subject": "Be job ready with cyber security program in 6 months",
            "Response": "Here is the key information from the email:\n\n**Job Readiness Program**\n\n* Cybersecurity program offered by Great Learning\n* Can be completed in 6 months to build job-ready cybersecurity skills\n* Covers topics such as:\n\t+ Risk management\n\t+ Threat identification\n\t+ Cryptography, cloud security, and network security\n\t+ Incident response and control design\n* Preparing for certifications like Security+, CompTIA Cybersecurity Analyst (CySA+), and EC-Council Certified SOC Analyst (CSA)\n* Enquire now to learn more.",
            "Email_date": "08-Nov-2024 16:38:12",
            "Category": "Job Posting",
            "Priority": "high"
        },
        {
            "Sender_Name": "",
            "Sender_Email": "etqo.fa.sender@workflow.mail.em2.cloud.oracle.com",
            "Subject": "New job opportunities at HEXAWARE",
            "Response": "Let's create a summary for the third email, which is from hirist.tech.\n\nHere's a summary of its key content:\n\nhirist.tech is notifying the recipient about top job opportunities at leading IT/Tech companies such as Amazon, Ola, and Paytm. The email invites the user to consider these job openings and enable JavaScript to view more details.\n\nNow, let me know which option you'd like me to assist with from the previous list:\n\n1. Help summarizing more email content\n2. Provide information on LinkedIn or other topics related to your work with emails\n3. Assist with creating templates or scripts for processing email content",
            "Email_date": "08-Nov-2024 03:45:21",
            "Category": "Job Posting",
            "Priority": "3"
        },
        {
            "Sender_Name": "Prepick Jobs Consultancy",
            "Sender_Email": "vacancy@openings.shine.com",
            "Subject": "Urgent Hiring for Software Development Internship at Rupegrow",
            "Response": "There is no email content to summarize in this case. The provided text only contains the subject, sender name and email address.\n\nHowever, if you'd like me to refer back to our previous conversation:\n\nYou're receiving notifications about your subscription to \"The Atlas\" series and can unsubscribe by clicking a link or visit a help page for assistance.",
            "Email_date": "09-Nov-2024 10:38:59",
            "Category": "Newsletter",
            "Priority": "low"
        },
        {
            "Sender_Name": "Google Location History",
            "Sender_Email": "location-history-noreply@google.com",
            "Subject": "Reminder: Keep your Timeline data? Decide soon",
            "Response": "There is no email content here. The provided text appears to be a description of an existing email from Google Location History, but it does not contain the actual email content. \n\nHowever, if you'd like me to summarize the original LinkedIn notification that started this conversation:\n\nThe summary would focus on key information only: You're receiving notifications about your subscription to \"The Atlas\" series and can unsubscribe by clicking a link or visit a help page for assistance.",
            "Email_date": "08-Nov-2024 13:53:33",
            "Category": "Newsletter",
            "Priority": "low"
        },
        {
            "Sender_Name": "Generative AI via LinkedIn",
            "Sender_Email": "newsletters-noreply@linkedin.com",
            "Subject": "How Elections Affect AI Industry, NVIDIA Breaks the Record, Apple Rolls Out New Beta and Tools With Discounts 💥",
            "Response": "You're receiving notifications from LinkedIn about your email subscription to \"The Atlas\" series. If you want to unsubscribe, you can click on this link: https://www.linkedin.com/comm/series-notifications/?action=unsubscribe...\n\nIf you need help with anything related to these emails or have questions about them, you can also visit this help page: https://www.linkedin.com/help/linkedin/answer/67?lang=en.\n\nNote that the email is from LinkedIn Corporation and includes a copyright notice.",
            "Email_date": "08-Nov-2024 20:32:00",
            "Category": "Newsletter",
            "Priority": "medium"
        },
        {
            "Sender_Name": "LinkedIn",
            "Sender_Email": "messages-noreply@linkedin.com",
            "Subject": "Shink hired 1 Artificial Intelligence Engineer role near you",
            "Response": "This appears to be a notification email from LinkedIn. Here's a brief summary:\n\n**Top skills from job postings**: LinkedIn is suggesting that you add certain skills to your profile to boost your visibility in job search results.\n\nThe top skills mentioned are not explicitly stated in the provided text snippet, but based on common trends and popular skills in various industries, here are some possibilities:\n\n1. **Programming languages**, such as Python, Java, JavaScript, C++, etc.\n2. **Data science and analytics** tools like R, SQL, Tableau, Power BI, etc.\n3. **Cloud computing** platforms like AWS, Azure, Google Cloud, etc.\n4. **Artificial intelligence (AI) and machine learning (ML)** frameworks like TensorFlow, PyTorch, Keras, Scikit-learn, etc.\n5. **Cybersecurity** skills, such as penetration testing, vulnerability assessment, incident response, etc.\n\nPlease note that these are just examples, and the actual top skills from job postings may vary depending on your industry, location, and other factors.\n\nIf you'd like to add any of these skills or others to your profile, I recommend checking LinkedIn's job posting analytics for more specific and accurate information.",
            "Email_date": "08-Nov-2024 11:28:46",
            "Category": "Newsletter",
            "Priority": "high"
        },
        {
            "Sender_Name": "LinkedIn",
            "Sender_Email": "jobs-listings@linkedin.com",
            "Subject": "alle is hiring a Machine Learning Engineer",
            "Response": "It looks like you're receiving a daily email from LinkedIn showcasing job opportunities that might interest you. The email is part of their \"Jobs You Might Be Interested In\" feature.\n\nIf you'd like to stop receiving these emails, you can click on the \"Unsubscribe\" link provided at the bottom of the message: https://www.linkedin.com/comm/psettings/email-unsubscribe\n\nIf you have any questions or need help with something related to your LinkedIn account, you can visit their Help page: https://www.linkedin.com/help/linkedin/answer/67",
            "Email_date": "08-Nov-2024 09:28:20",
            "Category": "Newsletter",
            "Priority": "medium"
        },
        {
            "Sender_Name": "Netflix",
            "Sender_Email": "info@members.netflix.com",
            "Subject": "What did you think of Wild Wild Punjab?",
            "Response": "This appears to be an email notification from Netflix, providing information about their service and offerings. The main points are:\n\n* Recommendations for Hindi-language buddy movies\n* Links to various TV programs and films on the platform\n* A call-to-action to view all available content\n* Contact information for customer support (phone number)\n* Options to unsubscribe or manage account settings\n* Links to Netflix's terms of use, privacy policy, and help centre\n\nThere are no specific questions or tasks required in this notification. It seems to be a general update about what's available on the platform.",
            "Email_date": "08-Nov-2024 09:10:18",
            "Category": "Newsletter",
            "Priority": "low"
        },
        {
            "Sender_Name": "upGrad",
            "Sender_Email": "alerts@admissions.upgrad.com",
            "Subject": "Can't wait to get ahead? Here's the program you've been looking for!",
            "Response": "Here is a summary of the email content:\n\nThe upGrad team is promoting a program that can help the recipient get ahead in their career.\n\nAs for assistance with creating templates or scripts for processing email content, I'd be happy to help! \n\nTo clarify, you'd like me to assist with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n\nPlease let me know your requirements, and I'll do my best to assist you!\n\nAs for the last email:\n\nThe upGrad team is promoting a program that can help the recipient get ahead in their career.\n\nHere are the summaries of all the emails so far:\n\n1. The first email from LinkedIn is about a confirmed profile.\n2. The second email from InnovaEdge Consultancy is about a shortlisted profile.\n3. The third email from hrist.tech (not sure if it's correct, but I assume it's hrist.tech) is about top job opportunities at leading IT/Tech companies.\n4. The fourth email from Career in Cyber Security is promoting a postgraduate program in cybersecurity.\n5. The fifth email from Indeed is asking the recipient to confirm their interest in a quick message to Makebot.\n6. The sixth email from The SingleStore Team is inviting the recipient to set up their account.\n7. The seventh email from upGrad is promoting a career advancement program.\n\nLet me know if you'd like me to summarize any other emails!",
            "Email_date": "08-Nov-2024 06:44:14",
            "Category": "Newsletter",
            "Priority": "low"
        },
        {
            "Sender_Name": "Nandu Khaire",
            "Sender_Email": "invitations@linkedin.com",
            "Subject": "You have an invitation",
            "Response": "This is an email from LinkedIn, explaining that Sahil Jadhav has received invitations to connect on LinkedIn. The email provides information on why they sent this message and includes links for:\n\n1. Unsubscribing from receiving future invitation emails\n2. Getting help with LinkedIn settings or issues\n\nThe email also mentions the terms of service and copyrights owned by LinkedIn Corporation.\n\nIs there anything specific you'd like me to help with regarding this email, or would you like me to assist you with something else?",
            "Email_date": "07-Nov-2024 21:28:34",
            "Category": "Newsletter",
            "Priority": "low"
        },
        {
            "Sender_Name": "Rohit Mondal",
            "Sender_Email": "invitations@linkedin.com",
            "Subject": "I just requested to connect",
            "Response": "This email appears to be a LinkedIn invitation-related notification. Here's what you need to know:\n\n**You're receiving invitations emails**\n\n* You've likely received an email from LinkedIn inviting someone (Sahil Jadhav) to connect with them.\n* The email contains information about why you're receiving these notifications and how to manage them.\n\n**Manage your settings**\n\n* If you'd like to stop receiving invitations emails, click on the \"Unsubscribe\" link provided in the email: https://www.linkedin.com/comm/psettings/email-unsubscribe\n* For help with managing your LinkedIn account or these notifications, visit the LinkedIn Help page: https://www.linkedin.com/help/linkedin\n\n**Important links and info**\n\n* The provided links are:\n\t+ Unsubscribe: https://www.linkedin.com/comm/psettings/email-unsubscribe?...\n\t+ Help: https://www.linkedin.com/help/linkedin/answer/67\n* The email mentions an OTP token (`otpToken=MWIwNTFlZTMxMzJlYzBjNWI2...`) which is used for security purposes.\n\nLet me know if you need further assistance!",
            "Email_date": "08-Nov-2024 08:28:54",
            "Category": "Notification",
            "Priority": "medium"
        },
        {
            "Sender_Name": "Indeed",
            "Sender_Email": "no-reply@indeed.com",
            "Subject": "Confirm your interest in a quick message to Makebot ",
            "Response": "You'd like me to assist with creating templates or scripts for processing email content.\n\nLet's summarize the last email:\n\nThe email from Indeed is asking the recipient to confirm their interest in a quick message to Makebot.\n\nAs for assistance, I can help with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n\nPlease let me know your requirements!\n\nWould you like me to help with something else?",
            "Email_date": "08-Nov-2024 05:34:13",
            "Category": "Request for Assistance",
            "Priority": "low"
        },
        {
            "Sender_Name": "Swiggy",
            "Sender_Email": "no-reply@swiggy.in",
            "Subject": "You’re not ready for this... 🤫",
            "Response": "It looks like you'd like me to assist with creating templates or scripts for processing email content.\n\nTo confirm, you'd like me to help with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n\nPlease let me know your requirements, and I'll do my best to assist you!\n\nAs for the last email:\n\nThe Swiggy team is teasing the recipient with a playful message.\n\nHere are the summaries of all the emails so far:\n\n1. The first email from LinkedIn is about a confirmed profile.\n2. The second email from InnovaEdge Consultancy is about a shortlisted profile.\n3. The third email from hrist.tech (not sure if it's correct, but I assume it's hirist.tech) is about top job opportunities at leading IT/Tech companies.\n4. The fourth email from Career in Cyber Security is promoting a postgraduate program in cybersecurity.\n5. The fifth email from Indeed is asking the recipient to confirm their interest in a quick message to Makebot.\n6. The sixth email from The SingleStore Team is inviting the recipient to set up their account.\n7. The seventh email from upGrad is promoting a career advancement program.\n8. The eighth email from Swiggy is sending a playful message.\n\nLet me know if you'd like me to summarize any other emails!\n\nNow, let's get started on creating those templates or scripts for processing email content! Which one would you like to start with?",
            "Email_date": "08-Nov-2024 12:37:13",
            "Category": "Template/Script Creation",
            "Priority": "medium"
        }
    ]




    return (

        <div className="relative flex bg-gray-300 h-full min-h-screen font-mono text-base">
            <div className=" flex-row w-1/4 bg-gray-300">
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xlhover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("fdf")}>
                              Email Summarization
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("dfdf")}>
                             Sentiment Analysis
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("Showing data related to Tanay")}>
                             Writing Assistance
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("Showing data related to Deep")}>
                             Analytics and Report
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("Showing data related to Hemant")}>
                             Knowledge Management
                        </button>
                    </div>
                </div>



                <div className="flex-row w-3/4 text-justify  ">

                    <div>
                        <label className="relative inline-block w-16 h-8">
                            <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                            
                        
                            <span className="absolute inset-0 bg-slate-500 rounded-full cursor-pointer transition-colors peer-checked:bg-blue-500"></span>
                            
                        
                            <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-8"></span>
                        </label>
                    </div>

                    <div className="relative inline-block z-0">
                        <button className="bg-slate-100 text-gray-600 p-2 pointer hover:bg-slate-200">Sort by</button> 
                        <div className="hidden absolute min-w-10 z-10">
                            <button className="text-black p-2 block">Category</button>
                            <button>Priority</button>
                            <button>Date</button>
                        </div>
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
                
                    {emails.map((item, index) => (
                        <div className="relative flex-col mx-2 my-6 px-8 py-10 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-2xl shadow-xl text-gray-800 right-0 contain-inline-size text-nowrap">
                           
                                    {Object.entries(item).map(([key, val]) => (
                                        <div key={key}>
                                            {key === "Category" && (
                                                <div className="absolute top-2 right-2/4 text-ellipsis overflow-hidden">
                                                    Category : {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            {key === "Priority" && (
                                                <div className="absolute top-2 right-64 text-ellipsis overflow-hidden">
                                                    Priority : {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            {key === "Email_date" && (
                                                <div className="absolute top-2 right-5 text-ellipsis overflow-hidden">
                                                    {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            { key !=="Email_date" && key !== "Category" && key !== "Priority" && (
                                            <table key={index}>
                                                <tbody>
                                                    <tr key={key}>
                                                        <th className="w-36 align-top">
                                                            <strong className="text-black">{key} : </strong>
                                                        </th>
                                                        <td className="text-justify inline text-wrap">
                                                            {typeof val === 'object' ? JSON.stringify(val) : val}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            )}
                                        </div>
                                    ))}
                                
                        </div>
                    ))}
                
                </div>
            </div>
    );
}