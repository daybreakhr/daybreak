const EMAIL_TEMPLATES = [
  {
    name: 'Introduction Mail from recruiter to Candidate',
    subject: '{{company_name}} is looking for a {{job_title}}',
    body: "<p>Hello {{candidate_name}},</p><p></p><p>I hope this message finds you well. I recently came across your profile on LinkedIn and I was genuinely impressed by your experience in <strong><em><u>[specific field or notable achievement]</u></em></strong>.</p><p></p><p>At {{company_name}}, we are constantly seeking talented individuals to join our team and accomplish great things together. We value collaboration and are always looking for opportunities to work with exceptional individuals like yourself.</p><p></p><p>If you are currently exploring new opportunities, I would love to connect with you to discuss how your skills and expertise align with our company's vision. We currently have a {{job_title}} opening, and I believe you could be a strong fit. You can have a look at the complete JD for the profile at {{job_link}}.  I would be happy to provide more details about the role and learn more about your background and aspirations.</p><p></p><p>I am available to chat at your convenience. Please let me know a suitable time to schedule a call. Alternatively, if you prefer email or LinkedIn communication, please let me know your preferred method.</p><p></p><p>Thank you for considering this opportunity, and I look forward to connecting with you soon.</p><p></p><p>Best regards,</p><p>{{sender_name}}</p><p>{{company_name}}</p>",
  },
  {
    name: 'Reject Candidate',
    subject: 'Status Update: {{job_title}} Role at {{company_name}}',
    body: '<p>Dear {{candidate_name}},</p><p></p><p>Thank you for taking the time to apply for the {{job_title}} role at {{company_name}}. We appreciate your interest in our organisation and the effort you put into your application.</p><p></p><p>After reviewing your qualifications and experience, we have decided not to move forward with your candidacy for the position. We received a high volume of applications, and unfortunately, we cannot select every candidate for further consideration.</p><p></p><p>Please do not take this decision as a reflection of your abilities or potential. We encourage you to keep searching for the right opportunity that aligns with your skills and goals. We appreciate your interest in our company and wish you the best in your career endeavours.</p><p></p><p>Thank you for your understanding and for considering {{company_name}} as a potential employer. We encourage you to visit our career page for future job openings that match your qualifications.</p><p></p><p>Best regards,</p><p>{{sender_name}}</p><p>{{company_name}}</p>',
  },
  {
    name: 'Offer Letter',
    subject: 'Offer Letter for the role {{job_title}}',
    body: '<p>Dear {{candidate_name}},</p><p></p><p>We’re delighted to extend this offer of employment for the position of {{job_title}} with {{company_name}}.</p><p></p><p>Please find your detailed offer letter attached below. We would like to have your response preferably by tomorrow. In the meantime, please feel free to contact me, if you have any questions or concerns.</p><p></p><p>We are confident you will be a valuable asset to our team and look forward to working with you.</p><p></p><p>Please sign and return the enclosed copy of this offer letter. If you have any questions, please do not hesitate to contact me.</p><p></p><p>We are all looking forward to having you on our team. Welcome to the {{company_name}} family!</p><p></p><p>Best regards,</p><p>{{sender_name}}</p><p>{{company_name}}</p>',
  },
]

export default EMAIL_TEMPLATES
