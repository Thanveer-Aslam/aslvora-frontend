import { UserCircle2 } from "lucide-react";

import Button from "../common/Button";
import Badge from "../common/Badge";
import Card from "../common/Card";

const ProfileHeader = ({ user = {}, onEdit }) => {
  return (
    <Card className="mb-6">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* User Details */}
        <div className="flex items-center gap-4">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="h-20 w-20 rounded-full object-cover border"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <UserCircle2 size={56} className="text-gray-400" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.fullName || "Customer"}
            </h2>

            <p className="mt-1 text-gray-500">
              {user?.email || "customer@example.com"}
            </p>

            <div className="mt-3">
              <Badge variant="primary">{user?.role || "Customer"}</Badge>
            </div>
          </div>
        </div>

        {/* Action */}
        <Button onClick={onEdit}>Edit Profile</Button>
      </div>
    </Card>
  );
};

export default ProfileHeader;
