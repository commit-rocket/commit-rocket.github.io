export interface OgProfile {
  userName: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface OgProfileMetaProps extends OgProfile {

}

const OgProfileMeta = ({ userName, firstName, lastName, gender }: OgProfileMetaProps) => {
  return (
    <>
      <meta property="profile:username" content={userName} />
      {firstName && <meta property="profile:first_name" content={firstName} />}
      {lastName && <meta property="profile:last_name" content={lastName} />}
      {gender && <meta property="profile:gender" content={gender} />}
    </>
  );
};

export default OgProfileMeta;