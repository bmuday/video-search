create database video_search;
-- \c video_search
create table Video(
    id int unique generated always as identity,
    name varchar(100) not null,
    description text,
    url text not null unique,
    createdAt timestamp default CURRENT_TIMESTAMP,
    updatedAt timestamp default CURRENT_TIMESTAMP --TODO: modifier automatiquement ce paramètre à chq requête
);

create table Tag(
    id int unique generated always as identity,
    value varchar(20) not null unique
);

create table Video_tag(
    id int unique generated always as identity,
    video_id int not null,
    tag_id int not null,
    CONSTRAINT fk_video
      FOREIGN KEY(video_id) 
	  REFERENCES video(id),
    CONSTRAINT fk_tag
      FOREIGN KEY(tag_id) 
	  REFERENCES tag(id)
);

/* BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updatedAt = now(); 
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;

BEGIN;
create database video_search;
-- \c video_search
create table video(
    id serial not null primary key,
    name varchar(255) not null,
    description text,
    url text not null,
    createdAt timestamp default CURRENT_TIMESTAMP,
    updatedAt timestamp default CURRENT_TIMESTAMP -- à modifier
);

CREATE TRIGGER user_timestamp BEFORE INSERT OR UPDATE ON video
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

COMMIT; */