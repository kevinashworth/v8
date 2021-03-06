import { addStrings } from 'meteor/vulcan:core'

addStrings('en', {

  'admin.users': 'User Admin',
  'users.admin': 'User Admin',

  'comments.comments': 'Comments',
  'comments.count': '{count, plural, =0 {No comments} one {# comment} other {# comments}}',
  'comments.count_0': 'No comments',
  'comments.count_1': '1 comment',
  'comments.count_2': '{count} comments',
  'comments.new': 'New Comment',
  'comments.no_comments': 'No comments to display.',
  'comments.reply': 'Reply',
  'comments.edit': 'Edit',
  'comments.delete': 'Delete',
  'comments.delete_confirm': 'Delete this comment?',
  'comments.delete_success': 'Comment deleted.',
  'comments.please_log_in': 'Please log in to comment.',
  'comments.parentCommentId': 'Parent Comment ID',
  'comments.topLevelCommentId': 'Top Level Comment ID',
  'comments.body': 'Body',
  'comments.rate_limit_error': 'Please wait {value} seconds before commenting again.',

  'errors.email_regex': 'Sorry, email address has the wrong formatting.',
  'errors.document': 'Something went wrong: {errorMessage}',

  'patches.missing_document': 'There is no History for this in the database.',

  'projects.summary_heading': 'Creative Notes',
  'projects.notes_heading': 'Production Notes',
  'projects.shooting_heading': 'Shooting Location',

  'users.complete_profile': 'Complete your user profile',
  'users.delete_success': 'User deleted',
  'users.delete_email_success': 'Email “{address}” deleted',
  'users.add_email': 'Add an Email',
  'users.add_email_success': 'Added email “{address}” successfully',
  'users.new_email': 'New Email',
  'users.primary_email': 'Primary Email',
  'users.unverified': 'Unverified',
  'users.verified': 'Verified',
  'users.verify_email': 'Send verification email',
  'users.verify_email_sent': 'Sent verification email to “{address}”',
  'users.cannot_access': 'Sorry, you do not have the rights to access the {title} page.'

})
