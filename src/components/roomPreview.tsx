import { Room } from '@prisma/client';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface RoomPreviewProps {
  rooms: Room[];
  title: string
};

const RoomPreview:FunctionComponent<RoomPreviewProps> = ({ rooms, title }) => {
  return (
    <div className="p-2">
      <p className="text-white">{title}</p>
      <div className="container-fluid m-0 p-0 w-100">
        <div className="overflow-auto">
          <div className="row flex-nowrap">
            {rooms.map(room => (
              <div className="col mb-2" key={room.id}>
                <div className="card text-bg-primary h-100" style={{width: "12rem"}}>
                  <div className="card-body">
                    <h5 className="card-title"><Link className="text-white" href={`/room/${room.id}`}>{room.name}</Link></h5>
                    <p className="card-text text-secondary">{room.dsc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPreview
