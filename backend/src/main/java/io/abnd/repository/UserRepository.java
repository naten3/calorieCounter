package io.abnd.repository;

import io.abnd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  public Optional<User> findByUsername(String username);

  @Query("select case when (count(u) > 0)  then true else false end  \n"
  + "from User u where u.username = :username")
  public boolean doesUserExist(String username);

  //TODO remove
  @Query("select count(u) from User u")
  public int getCount();
}
