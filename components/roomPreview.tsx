import { Room } from '@prisma/client';

export default function RoomPreview({ rooms, title }: { rooms: Room[], title: string}) {
  return (
    <div className="p-2">
      <h2 className="h3 text-white">{title}</h2>
      <div className="container-fluid m-0 p-0 w-100">
        <div className="overflow-auto">
          <div className="row flex-nowrap">
            {rooms.map(room => (
              <div className="col mb-2" key={room.id}>
                <div className="card text-bg-primary h-100" style={{width: "12rem"}}>
                  <div className="card-body">
                    <h3 className="h5 card-title"><a className="text-white " href={`/rooms/${room.id}`}>{room.name}</a></h3>
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
