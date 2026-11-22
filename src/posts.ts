export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'sub-60-second-response-rule',
    title: 'The 60-second rule: why slow follow-up costs developers lakhs',
    category: 'Follow-up',
    date: 'June 24, 2026',
    readTime: '4 min read',
    summary:
      'A buyer who enquires is comparing you with three other projects that same evening. Whoever calls first usually gets the site visit.',
    body: [
      'Most builders measure lead follow-up in hours, sometimes days. By the time someone on the sales team reads the email, works out which project it was for and dials the number, the buyer has already clicked on two competitors’ ads.',
      'The pattern is consistent: the chance of reaching a buyer drops sharply after the first few minutes. After half an hour, many leads are effectively gone. Not because they weren’t interested, but because someone else answered first.',
      'The fix isn’t working harder. It’s removing the steps between the form and the phone. When someone enquires, they should get your brochure straight away, and your sales team should get an alert with the buyer’s name, number and which ad they came from, all within a minute.',
      'That way your team isn’t cold-calling a list. They’re calling someone who is looking at your brochure right now. That one change usually does more for site visits than any change to the ads themselves.',
    ],
  },
  {
    slug: 'how-builders-waste-ad-spend',
    title: 'Where most real estate ad budgets actually go',
    category: 'Ads',
    date: 'June 18, 2026',
    readTime: '6 min read',
    summary:
      'Cheap clicks don’t sell apartments. A look at the search mistakes that send budget to renters, brokers and people who never meant to enquire.',
    body: [
      'Walk into almost any sales office in Hyderabad and you’ll hear the same thing: “The leads from online ads are rubbish.” Numbers that are switched off, people who don’t remember filling a form, brokers looking for a deal.',
      'That isn’t a problem with online advertising. It’s a problem with how the campaigns are set up. Many agencies are judged on clicks and impressions, so campaigns drift toward cheap, broad keywords.',
      'Target “3 BHK apartments in Gachibowli” on broad match and your ad will also show for “3 BHK flat for rent”, “cheap flats under 30 lakhs” and “PG in Gachibowli”. Each of those clicks costs money and none of them is a buyer.',
      'We run exact and phrase-match keywords, keep a negative keyword list that grows every week, and ask one or two qualifying questions on the form. Clicks cost a little more. Cost per real site visit drops a lot.',
    ],
  },
  {
    slug: 'database-central-nervous-system',
    title: 'Why your leads shouldn’t live in a WhatsApp group',
    category: 'Lead tracking',
    date: 'May 12, 2026',
    readTime: '5 min read',
    summary:
      'When leads are forwarded as chat messages, follow-ups slip and nobody can say which campaign produced a booking. A shared board fixes both.',
    body: [
      'Every lead arrives with useful information: which project they looked at, what they searched for, roughly what they can spend and when they enquired. Then it gets copy-pasted into a WhatsApp group and most of that is lost.',
      'There’s no record of who called whom, what the buyer said, or when the visit is. Leads get forgotten, two people call the same buyer, and eventually the developer stops trusting the campaigns altogether.',
      'We put every lead into one shared board, whether that’s Airtable, a simple CRM or the one you already use. Each lead has a status your team updates with one tap: trying to reach, brochure sent, visit booked, follow up, not a fit.',
      'Now you can open the board any day and see how many visits are booked this week, and trace each one back to the campaign that brought it in. That’s what makes it possible to put more money behind what works.',
    ],
  },
];
