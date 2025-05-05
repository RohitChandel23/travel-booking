import './TeamCard.css';

interface TeamCardProps {
  readonly profileImage: string;
  readonly name: string;
  readonly role: string;   
}

function TeamCard({ profileImage, name, role }:TeamCardProps) {
  return (
    <div className='team-card-wrapper'>
      <div className='member-image-container'>
        <img src={profileImage} alt={name} />
      </div>
      <div className='name-and-role'>
        <h6>{name}</h6>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default TeamCard;