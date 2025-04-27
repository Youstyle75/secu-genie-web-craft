
import { Link } from 'react-router-dom';
import { QuickReply } from './types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onReplyClick: (reply: QuickReply) => void;
  onRedirectContact: () => void;
  onRedirectFaq: () => void;
}

const QuickReplies = ({ replies, onReplyClick, onRedirectContact, onRedirectFaq }: QuickRepliesProps) => {
  return (
    <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2 bg-gray-50">
      {replies.slice(0, 3).map((reply) => (
        <button
          key={reply.id}
          onClick={() => onReplyClick(reply)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 truncate transition-colors"
        >
          {reply.text}
        </button>
      ))}
      <Link
        to="/faq"
        onClick={onRedirectFaq}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 truncate transition-colors"
      >
        Voir la FAQ
      </Link>
      <Link
        to="/contact"
        onClick={onRedirectContact}
        className="px-3 py-1 bg-accent text-white hover:bg-accent-hover rounded-full text-sm truncate transition-colors"
      >
        Contacter un conseiller
      </Link>
    </div>
  );
};

export default QuickReplies;
