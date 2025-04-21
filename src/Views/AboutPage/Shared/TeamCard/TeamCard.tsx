// import './TeamCard.css';
// import { ProjectImages } from '../../../../assets/ProjectImages';

// function TeamCard(){
// return(
// <div className='team-card-wrapper'>
//     <div className='member-image-container'>
//         <img src={ProjectImages.FRANCE}/>
//     </div>
//     <div className='name-and-role'>
//         <h6>Andre Davie</h6>
//         <p>Chief Executive</p>
//     </div>
// </div>
// )
// }
// export default TeamCard;


import './TeamCard.css';

interface TeamCardProps {
    profileImage: string;
    name: string;
    role: string;   
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